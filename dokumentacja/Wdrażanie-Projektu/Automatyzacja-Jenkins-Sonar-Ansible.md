# Dokumentacja z tworzenia projektu dotyczącego automatyzacji wdrażania aplikacji webowej na serwer produkcyjny z wykorzystaniem narzędzi: Jenkins, Sonarqube, Ansible i inne.

# Przygotowanie
Ze względu na częste przemieszczanie się i pracę na różnych urządzeniach, postanowiłem stworzyć prostą strukturę Ansible, która umożliwi mi automatyzację instalacji Dockera, Jenkins oraz SonarQube na maszynie wirtualnej. Dzięki temu proces instalacji będzie uniwersalny i niezależny od konfiguracji poszczególnych urządzeń.

## Ansible

Ansible to narzędzie do automatyzacji konfiguracji, zarządzania i wdrażania aplikacji na wielu serwerach. Pomogło mi w przygotowaniu maszyny wirtualnej, automatyzując proces instalacji Dockera, Jenkins i SonarQube.

Wszystkie pliki dotyczące Ansible znajdują się w katalogu /ansible. Na początek warto zwrócić uwagę na plik hosts.yml, w którym definiujemy hosty oraz ich grupy, a także ustawienia specyficzne dla poszczególnych maszyn. Tutaj mam już opisanego użytkownika utworzonego w późniejszym playbooku, dzięku któremu będę tworzyć wszystkie zmiany.

Oczywiście pozwalam sobie na pozostawienia tu hasła, ponieważ jest to tylko maszyna wirtualna bez publicznego dostępu :) 

**Plik `host.yml`**

```yml
all:
  vars:
    ansible_user: ansible_user
    ansible_ssh_private_key_file: /home/dawid/.ssh/ansible_rsa
    ansible_become_password: Zaq12wsx
  hosts:
    srv1:
      ansible_host: 192.168.1.235

```

Pierwszym plikiem playbooka, który użyjemy, jest `create_user.yml`. W tym pliku tworzymy użytkownika z pełnymi uprawnieniami do zarządzania serwerem, co znacznie ułatwi pracę i jednocześnie pozwoli na oddzielenie odpowiedzialności. Dodatkowo dodajemy klucz publiczny do ssh, 

**Plik `create_user.yml`**

```yml
---
- name: Create ansible user with full access
  hosts: all
  become: true
  tasks:
    - name: Create ansible user
      user: 
        name: ansible_user
        state: present
        create_home: true
        shell: /bin/bash

    - name: Add ansible_user to sudoers with full access
      become: true
      lineinfile:
        dest: /etc/sudoers
        regexp: '^ansible_user'
        line: 'ansible_user ALL=(ALL) NOPASSWD:ALL'
        validate: '/usr/sbin/visudo -cf %s'

    - name: Add SSH key for ansible_user
      authorized_key:
        user: ansible_user
        state: present
        key: "{{ lookup('file', '/home/dawid/.ssh/ansible_rsa.pub') }}"
```

### Instalacja docker na maszynie

Następnym plikiem jest `install_docker.yml`, w którym instalujemy Docker na maszynie, co pozwala na łatwe zarządzanie kontenerami i uruchamianie aplikacji w izolowanym środowisku.

**Plik `install_docker.yml`**

```yml
---
- name: Install Docker on Ubuntu (using official Docker GPG key and repository)
  hosts: all
  become: yes
  tasks:

    - name: Update apt cache
      apt:
        update_cache: yes

    - name: Install required packages (ca-certificates, curl)
      apt:
        name:
          - ca-certificates
          - curl
        state: present

    - name: Install directory for keyring
      file:
        path: /etc/apt/keyrings
        state: directory
        mode: '0755'

    - name: Download Docker GPG key
      get_url:
        url: https://download.docker.com/linux/ubuntu/gpg
        dest: /etc/apt/keyrings/docker.asc
        mode: '0644'

    - name: Ensure the keyring file is readable
      file:
        path: /etc/apt/keyrings/docker.asc
        mode: '0444'

    - name: Add Docker repository to Apt sources
      shell: |
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
      args:
        creates: /etc/apt/sources.list.d/docker.list

    - name: Update apt cache after adding Docker repository
      apt:
        update_cache: yes

    - name: Install Docker and related packages
      apt:
        name:
          - docker-ce
          - docker-ce-cli
          - containerd.io
          - docker-buildx-plugin
          - docker-compose-plugin
        state: present

    - name: Ensure Docker service is running
      service:
        name: docker
        state: started
        enabled: yes
```

### Instalacja Jenkins i Sonarqube za pomocą Ansible

Tutaj wykorzystujemy równiez pliki z folderu `/files`

**Plik `install-jenkins-sonar.yml`**

```yml
---
- name: Install Jenkins using Docker and Docker Compose
  hosts: all
  become: yes
  tasks:
    - name: Create directory for Jenkins Docker setup
      file:
        path: /docker/jenkins
        state: directory
    
    - name: Copy Dockerfile to the remote server with a new name
      copy:
        src: ./files/Dockerfile-jenkins
        dest: /docker/jenkins/Dockerfile

    - name: Copy docker-compose.yml to create Jenkins
      copy:
        src: ./files/docker-compose-jenkins.yml
        dest: /docker/jenkins/docker-compose.yml

    - name: Build Docker image from Dockerfile
      command: docker build -t myjenkins-blueocean .
      args:
        chdir: /docker/jenkins

    - name: Check if Jenkins network exists
      shell: docker network ls --filter name=jenkins -q
      register: network_exists
      changed_when: false

    - name: Create Jenkins external network in Docker if not exists
      command: docker network create jenkins
      when: network_exists.stdout == ""
        
    - name: Start Jenkins container using docker-compose
      command: docker compose up -d
      args:
        chdir: /docker/jenkins

    - name: Run ssh-keyscan inside the jenkins-blueocean container
      command: docker exec jenkins-blueocean sh -c "ssh-keyscan github.com >> ~/.ssh/known_hosts"
      args:
        chdir: /docker/jenkins
      
    - name: Create directory for sonarqube Docker setup
      file:
        path: /docker/sonarqube
        state: directory

    - name: Copy docker-compose.yml to create sonarqube
      copy:
        src: ./files/docker-compose-sonar.yml
        dest: /docker/sonarqube/docker-compose.yml

    - name: Start Sonarqbue container using docker-compose
      command: docker compose up -d
      args:
        chdir: /docker/sonarqube
```

Kod `Run ssh-keyscan inside the jenkins-blueocean container` pozwoli nam na dodanie zaufanego połaczenia ssh dla github, który przyda nam się później.

Dzięki tym plikom jestem w stanie w bardzo łatwy sposób skonfigurować dowolną maszynę wirtualną. Wystarczy, że skonfiguruje ansible pod dana maszynę i wszystko robi się za mnie. 

![ansible]

## Konfiguracja Jenkinsa do pracy z GitHub – Dodawanie klucza SSH i tworzenie pipeline

Na razie moje repozytorium jest ustawione jako prywatne, dlatego potrzebujemy skonfigurować Jenkins, aby mógł uzyskać dostęp do prywantego repozytorium.

### Aby skonfigurować Jenkinsa do pracy z prywatnym repozytorium na GitHubie, wykonaj poniższe kroki, które pozwolą Jenkinsowi uzyskać dostęp do repozytorium oraz wykrywać zmiany.


#### Generowanie pary klucza

1. Na dowolnym komputerze (na którym masz dostęp do terminala) wygeneruj parę kluczy SSH:
   ```bash
   ssh-keygen -t rsa -b 4096 -C "jenkins" -f /tmp/jenkins_rsa
    ```
Parametr `-f` określa lokalizację i nazwę pliku, w którym klucz będzie zapisany. Zawartość klucza prywatnego zostanie zapisana w `/tmp/jenkins_rsa`, a klucza publicznego w `/tmp/jenkins_rsa.pub`.

#### Dodanie klucza publicznego ssh do github - deploy keys
1. Przejdź do swojego repozytorium na GitHubie.
2. Wejdź w Settings repozytorium, a następnie w zakładkę Deploy keys.
3. Kliknij Add deploy key.
4. W polu Title wprowadź nazwę, np. "Jenkins SSH Key".
5. Wklej zawartość klucza publicznego SSH, który wcześniej skopiowałeś, w pole Key.
6. Upewnij się, że zaznaczone jest Allow write access, jeśli chcesz, by Jenkins mógł wypychać zmiany do repozytorium.
7. Kliknij Add key.
   
![github-key]

####  Dodanie klucza prywatnego SSH do Jenkins (Credentials)

1. Zaloguj się do swojego Jenkinsa.
2. Przejdź do Manage Jenkins > Manage Credentials > (global) lub inna domena, jeśli masz taką stworzoną.
3. Kliknij Add Credentials.
4. Wybierz SSH Username with private key jako typ poświadczeń.
5. W polu ID wpisz nazwę poświadczenia, np. "github-jenkins-key".
6. W polu Username wprowadź nazwę użytkownika (zwykle jest to git).
7. W polu Private Key wybierz opcję Enter directly, a następnie wklej zawartość klucza prywatnego (plik jenkins_rsa).
8. Kliknij OK.

![jenkins-github-credential]

#### Tworzenie nowego pipeline w Jenkinsie

**WAŻNE!!** Jako link do repozytroium dodajemy link ssh: `git@github.com:Dawo9889/My-Portfolio-CICD.git`
![create-pipeline]

Jako że nasz Jenkins jest utworzony w lokalnej sieci, nie będziemy mogli go bezpośrednio spiąć z githubem za pomocą webhooka, ponieważ serwer githuba go nie widzi. Dlatego stworzymy `Poll SCM`, dzieki któremu Jenkins co 5minut będzie sprawdzał czy są jakieś zmiany w repozytroium.

`H/5 * * * *` – Sprawdzanie repo co 5 minut.

Jeżeli chodzi o nasz pipeline, to będziemy go definiować w pliku Jenkinsfile, dlatego musimy skonfigurować Jenkins do pobierania tego pliku właśnie z scm:

![pipeline-scm]

Jeżeli wszystko skonfigurowaliśmy poprawnie to nasz build powinien przejść pomyślnie

![jenkins-success]

### Prosty pipeline

Teraz stwórzmy pipeline, który uruchomi się na agencie docker z gotowym środowiskiem:

**`Jenkinsfile`**
```groovy
pipeline {
    agent {
        docker {
            image 'node:18'  
        }
    }
    stages {
        stage('Checkout Code') {
            steps {
                script {
                    checkout scm  
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'  
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'npm run build'  
                }
            }
        }

        stage('Post-build') {
            steps {
                script {
                    echo 'Build completed!'
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline zakończony sukcesem!'  
        }
        failure {
            echo 'Pipeline zakończony błędem!'  
        }
    }
}

```

Jest to bardzo prosty pipeline, który tylko buduje nasz kod. Dzięki niemu możemy sprawdzic czy wszystko działa tak jak należy.

## Integracja Jenkins z Sonarqbue

Po więcej informacji zapraszam: [Instalacja Jenkins i SonarQube](../Instalacja-Jenkins-SonarQube/Jenkins-i-SonarQube.md) - Tu zająłem się szczegółowym opisem kroków, które tutaj podejmę. 

Po konfiguracji możemy utworzyć stage pod analize kody, jeżeli wszystko mamy dobrze, to powinna pojawić się nam analiza w sonarqube.
Jednoczesnie zmieniłem plik Jenkinsfile, ponieważ w międzyczasie moja struktura projektu przeszła restrukturyzacje. Zauważyłem że kopiuje wszystko do kontenera, co też sonarqube zauwazył.

```groovy
pipeline {
    agent none 
    stages {
        stage('Checkout Code') {
            agent {
                docker {
                    image 'node:18'
                }
            }
            steps {
                script {
                    checkout scm  
                }
            }
        }

        stage('Install Dependencies') {
            agent {
                docker {
                    image 'node:18'
                }
            }
            steps {
                script {
                    dir('./app') {
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Build') {
            agent {
                docker {
                    image 'node:18'
                }
            }
            steps {
                script {
                    dir('./app') {
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Analyze code with sonarqube') {
            agent any
            steps {
                script {
                    def scannerHome = tool 'sonar-scanner'

                    withSonarQubeEnv('sonarqube-server') {
                        withCredentials([string(credentialsId: 'sonarqube-my-portfolio-token', variable: 'SONAR_TOKEN')]) {
                            dir('./app') {
                                sh """
                                    ${scannerHome}/bin/sonar-scanner \
                                    -Dsonar.projectKey=my-portfolio \
                                    -Dsonar.sources=. \
                                    -Dsonar.login=${SONAR_TOKEN}
                                """
                            }
                        }
                    }
                }
            }
        }

        stage('Post-build') {
            agent any
            steps {
                script {
                    echo 'Build completed!'
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline zakończony sukcesem!'  
        }
        failure {
            echo 'Pipeline zakończony błędem!'  
        }
    }
}

```

Sonarqube wskaujze nam na przykład taki bład: 

![sonar-issues]

Co sugeruje nam, że kontener jest uruchamiany z użyykownikiem root, żeby to naprawić musimy okreslić uzytkownika, który będzie uruchamiany w kontenerze. Aby to zrobić wystarczu do pliku `Dockerfile` dodać na przykład `User nodejs`. 

Teraz gdy ponownie uruchomimy pipeline i wykona sie skan, wszystko jest już jako pozytywne:

![sonar-fixed]


Na razie nasza analiza kodu nie wpływa na wynik wykonania się Pipeline'u. Aby to zmienić wystraczy dodać kod do Jenkinsfile, który będzie czekał na wynik analizy.

```groovy
stage('Check Quality Gate') {
            agent any
            steps {
                script {
                    timeout(time: 5, unit: 'MINUTES') {
                        waitForQualityGate abortPipeline: true
                    }
                }
            }
        }
```

## Budowanie i wypychanie obrazu kontenera do prywatnego repozytorium

W procesie CI/CD kluczową rolę odgrywa również część CD – Continuous Delivery (ciągła dostawa), która jest fundamentem zautomatyzowanego wdrażania. Bez tego elementu cały proces nie jest w pełni zautomatyzowany.

Po zakończeniu etapów, w których pipeline weryfikuje poprawność naszego kodu, przechodzimy do kolejnego kroku, jakim jest budowanie obrazu kontenera oraz wypchnięcie go do repozytorium. Do tego celu wykorzystamy Docker Hub – popularne repozytorium dla obrazów kontenerowych.

Przede wszystkim przygotujmy naszą infrastrukturę do tego zadania:
1. Stwórzmy access token w docker hub:
   ![docker-token]
2. Aby Jenkins mógł uzyskać dostęp do naszego repozytorium na Docker Hub, musimy dodać odpowiednie dane uwierzytelniające jako poufne zmienne. W tym przypadku, jako nazwę użytkownika podajemy nasze konto na Docker Hub, a jako hasło – token dostępu.
   ![jenkins-docker-cred]

3. W naszym pipeline dodajemy etap, który będzie odpowiedzialny za budowanie obrazu kontenera oraz wypychanie go do naszego repozytorium na Docker Hub. Etap ten zostanie uruchomiony tylko wtedy, gdy wszystkie poprzednie etapy pipeline zakończą się powodzeniem, co zapewnia odpowiednią kontrolę nad jakością kodu przed utworzeniem obrazu.
   ```groovy

    environment {
        DOCKER_IMAGE = 'baitazar/my-portfolio-app'  
        DOCKER_TAG = 'latest'
        DOCKER_REGISTRY = 'registry.hub.docker.com' 
    }

           stage('Building and pushing container image') {
            agent any
            when {
                allOf {
                    expression {
                        currentBuild.result == null || currentBuild.result == 'SUCCESS'  
                    }
                }
            }
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-access-token', 
                                           usernameVariable: 'DOCKERHUB_CREDENTIALS_USR', 
                                           passwordVariable: 'DOCKERHUB_CREDENTIALS_PSW')]) {
                        
                        sh """
                            docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW}
                            docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                            docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                        """
                    }
                }
            }
        }
   ```
**Warunek** `when`: Etap ten uruchomi się tylko wtedy, gdy wszystkie poprzednie etapy pipeline zakończą się sukcesem (sprawdzamy, czy currentBuild.result == null || currentBuild.result == 'SUCCESS').

**Zalogowanie do Docker Hub**
`withCredentials`: Zmienna środowiskowa `DOCKERHUB_CREDENTIALS_USR` i `DOCKERHUB_CREDENTIALS_PSW` zawierają dane uwierzytelniające do Docker Hub, które wcześniej zapisaliśmy jako poufne zmienne w Jenkinsie.

**docker login**: Komenda logowania do Docker Hub przy użyciu wcześniej wczytanych zmiennych (`DOCKERHUB_CREDENTIALS_USR` i `DOCKERHUB_CREDENTIALS_PSW`).

Gdy wszystko mamy skonfigurowane tak jak należy to na naszym repozytorium powinien pojawić się obraz:
![docker-hub-image]

[ansible]: ./media/ansible.png
[github-key]: ./media/github-key.png
[jenkins-github-credential]: ./media/jenkins-private-key-github.png
[create-pipeline]: ./media/create-pipeline.png
[trigger]: ./media/trigger.png
[pipeline-scm]: ./media/pipeline-scm.png
[jenkins-success]: ./media/jenkins-success.png
[jenkins-add-sonar-server]: ./media/jenkins-add-sonar-server.png

[sonar-first-analysis]: ./media/sonar-first-analysis.png
[sonar-issues]: ./media/sonar-issue-user.png
[sonar-fixed]: ./media/sonar-fixed.png

[docker-token]: ./media/docker-token.png
[jenkins-docker-cred]: ./media/jenkins-docker-cred.png
[docker-hub-image]: ./media/docker-hub-image.png