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


[ansible]: ./media/ansible.png
[github-key]: ./media/github-key.png
[jenkins-github-credential]: ./media/jenkins-private-key-github.png
[create-pipeline]: ./media/create-pipeline.png
[trigger]: ./media/trigger.png
[pipeline-scm]: ./media/pipeline-scm.png
[jenkins-success]: ./media/jenkins-success.png