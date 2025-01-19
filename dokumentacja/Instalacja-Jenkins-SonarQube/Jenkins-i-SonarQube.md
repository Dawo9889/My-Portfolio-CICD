# Dokumentacja z instalacji Jenkins i Sonarqube wraz z integracją obydwu tych sytemów - Dawid Gala

## 1. Jenkins - Instalacja

Metod na instalację tego oprogramowania jest wiele. Jednak zalecałbym dwie opcje:

1. Docker.
2. Linux - jako usługa.

Przejdę przez obie te instalacje, chociaż osobiście zalecam instalacje jako **kontener (Docker)**, ponieważ jest to tak naprawdę kopiuj wklej pliku docker-compose.

### 1.1. Instalacja Jenkins w Docker

W razie jakichkolwiek kłopotów zalecam skorzystanie z [oficjalnej dokumentacji Jenkins](https://www.jenkins.io/doc/book/installing/docker/)

#### 1.1.1. Stworzenie własnego obrazu Dokcerfile

Wlasny obraz Dockerfile pozwoli nam na ewentualną modyfikacje naszego kontera i tego co się w nim znajduje.

#### 1.1.2. Kod Dockerfile do zbudowania naszego obrazu

```Dockerfile
FROM jenkins/jenkins:2.479.3-jdk17
USER root
RUN apt-get update && apt-get install -y lsb-release
RUN curl -fsSLo /usr/share/keyrings/docker-archive-keyring.asc \
  https://download.docker.com/linux/debian/gpg
RUN echo "deb [arch=$(dpkg --print-architecture) \
  signed-by=/usr/share/keyrings/docker-archive-keyring.asc] \
  https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list
RUN apt-get update && apt-get install -y docker-ce-cli
USER jenkins
RUN jenkins-plugin-cli --plugins "blueocean docker-workflow"

```

Ten kod pozwala nam na zbudowanie obrazu, zawierającego narzędzia docker i zainstalowanie wtyczki blueocean.

Teraz zbudujmy ten obraz.

Aby to zrobić wykonajmy kod `docker build -t myjenkins-blueocean:latest .`

`-t` - określa naszą nazwę obrazu.
`.`  - wskazuje na miejsce w którym znajduje się nasz plik `Dockerflie` dlatego najlepiej być w tym samym katalogu.

Teraz możemy przejść do stworzenia pliku `docker-compose.yaml`, w którym określimy wszystkie parametry naszych kontenerów, a będzie ich dwa.

#### 1.1.3. Kod docker-compose.yaml dla Jenkins

```yaml
version: '3.8'

services:
  docker:
    image: docker:dind
    container_name: jenkins-docker
    privileged: true
    environment:
      DOCKER_TLS_CERTDIR: "/certs"
    networks:
      jenkins:
        aliases:
          - docker
    volumes:
      - jenkins-docker-certs:/certs/client
      - jenkins-data:/var/jenkins_home
    ports:
      - "2376:2376"
    command: ["--storage-driver", "overlay2"]

  jenkins:
    image: myjenkins-blueocean
    container_name: jenkins-blueocean
    restart: on-failure
    environment:
      DOCKER_HOST: "tcp://docker:2376"
      DOCKER_CERT_PATH: "/certs/client"
      DOCKER_TLS_VERIFY: "1"
    networks:
      - jenkins
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - jenkins-data:/var/jenkins_home
      - jenkins-docker-certs:/certs/client:ro

networks:
  jenkins:
    external: true

volumes:
  jenkins-docker-certs:
  jenkins-data:

```

Kod jest tak naprawdę gotowy do użycia. Jedyną szczególną uwagę trzeba zwrócić na `ports` przy kontenerze **jenkins-blueocean**.

Woluminy zostawiamy dockerowi do ich zarządzania. Jeżeli zależy nam na większej swobodzie, możemy zdefiniować własne katalogi.

Dzięki temu, że zbudowaliśmy własny obraz możemy go teraz wykorzystać:
`image: myjenkins-blueocean`.

#### 1.1.4. Uruchomienie kontenerów

Teraz możemy uruchomić nasze kontenery za pomocą `docker compose up`. Proszę mięć na uwadzę, ze pierwsze ruchomienie będzie trwało dlugo i jednocześnie mogą wyskoczyć jakieś błędy. Dlatego uruchomimy kontenery w trybie śledzenia logów.

Gdy wszystko się załaduje to w naszych logach powinno pojawić sie haslo, które będzie nam potrzebne na stronie. Proszę je skopiować

![Jenkins haslo do pierwszego uruchomienia][jenkins-first-password]

Teraz gdy wiemy, że wszystko działa, możemy uruchomić nasze kontenery w trybie `--detach`. Aby to zrobić wpisujemy: `docker compose up -d`. Teraz gdybyśmy chcieli widzieć logi możemy wpisać: `docker compose logs -f`, co sprawi, że na bieżąco będziemy widzieć logi z tych kontenerów.

Po zakończeniu zapraszam do przejścia do sekcji [Pierwsze kroki po instalacji](1.3.-Jenkins---Pierwsze-kroki-po-instalacji).

### 1.2. Instalacja Jenkins na Linuxie (Ubuntu Server)

W razie jakichkolwiek kłopotów zalecam skorzystanie z [oficjalnej dokumentacji Jenkins](https://www.jenkins.io/doc/book/installing/linux/)

Moja instalacja będzie na Ubuntu Server. Przede wszystkim potrzebujemy mieć zainstalowane środowisko Javy w wersji 17. Aby to zrobić:

#### 1.2.1. Instalacja JDK

```bash
sudo apt update
sudo apt install fontconfig openjdk-17-jre
java -version
```

Powinno nam się pojawić coś takiego:

```bash
openjdk version "17.0.13" 2024-10-15
OpenJDK Runtime Environment (build 17.0.13+11-Debian-2)
OpenJDK 64-Bit Server VM (build 17.0.13+11-Debian-2, mixed mode, sharing)
```

#### 1.2.2. Instalacja Jenkins

```bash
sudo wget -O /usr/share/keyrings/jenkins-keyring.asc \
  https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc]" \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt-get update
sudo apt-get install jenkins
```

#### 1.2.3. Uruchamianie Jenkins

Możemy włączyć usługę Jenkins, aby uruchamiała się automatycznie przy starcie systemu, używając polecenia:

```bash
sudo systemctl enable jenkins
```

Aby ręcznie uruchomić usługę Jenkins, użyjmy polecenia:

```bash
sudo systemctl start jenkins
```

Możemy sprawdzić status usługi:

```bash
sudo systemctl status jenkins
```

Teraz skoiujmy hasło za pomocą `cat /var/lib/jenkins/secrets/initialAdminPassword` i przejdźmy do [Pierwsze kroki po instalacji](1.3.-Jenkins---Pierwsze-kroki-po-instalacji)

### 1.3. Jenkins - Pierwsze kroki po instalacji

Gdy mamy już wszystko gotowe do działania możemy przejść pod adres `http://localhost:<Port który ustawilismy>`

Powinno nas przywitać takie okno:

![jenkins-init]

Wkleajmy tu nasz klucz, który wcześniej kopiowaliśmy.
Polceam zainstalować zalecane nam wtyczki.

![jenkins-plugins]

Teraz możemy utworzyć naszego pierwszego użytkownika:

![jenkins-creating-user]

Reszte zostawiamy domyślnie i czekamy aż wszystko sie skonfiguruje.

#### 1.3.1. Dodanie wtyczki docker do naszego jenkinsa

Teraz dodamy potrzebne wtyczki, aby uruchamiać nasz kod na agentach dockerowych, to mocno ułatwia nam prace.
Żeby to zrobić musimy wejść w ustawienia jenkinsa:

![jenkins-manage]

Przechodzimy do zakladki plugins i szukamy docker do instalacji:
W przypadku instalacji na linuxie będzie jeszcze wtyczka **`docker pipelines`** do zainstalowania

![jenkins-plugin-docker]

Zaznaczamy docker i klikamy instaluj w prawym górnym rogu
Jednocześnie zalecam uruchomienie ponowne Jenkina w celu zaladowania wszystkich wtyczek, które miały początkowo z tym problem. Aby to zrobić mamy dwie opcje w zależności od naszej instalacji:

- `docker compose up -d --force-recreate`
- `systemctl restart jenkins`

Teraz możemy utworzyć testowy pipeline aby sprawdzić poprawność naszego działania
Aby to zrobić przechodzimy do głównej **tablicy** i wybieramy **nowy projekt**, następne wybieramy **Pipeline** i nazywamy nasz nowy projekt

![jenkins-first-pipeline]

Wszystko możemy zostawić tak jak jest. Teraz nas interesuje zakładka **Pipeline**. To tutaj definiujemy nasz kod, który ma sie wykonywać na serwerze.

![jenkins-pipeline-code]

##### 1.3.1.1. Kod dla testowego pipeline'u

```groovy
pipeline {
    agent {
        docker {
            image 'alpine:latest'
        }
    }
    stages {
        stage('Check Docker Agent') {
            steps {
                echo 'Testing Docker Agent...'
                sh 'echo "Docker agent is working!"'
            }
        }
    }
    post {
        always {
            echo 'Pipeline completed.'
        }
    }
}
```

Teraz zapisujemy nasz kod i uruchamiamy nasz pipeline
Jeżeli wszystko skonfigurowaliśmy poprawnie to powinno przejść pomyślnie.

![jenkins-pipeline-success]

## 2. Sonarqube - Instalacja

Tak samo jak w przypadku Jenkisa - tutaj też mamy wiele opcji instalacji. Ja jednak skupię się tylko na sposobie, wykorzystujacym docker, ponieważ aplikacja ta wykorzystuje silnik bazodanowy i łatwiej - szczególnie dla początkujących - będzie to wdrożyć za pomocą kontenerów.

### 2.1. Insalacja Sonarqube za pomocą docker

Utwórzmy nowy plik `docker-compose.yaml` w folderze `/sonarqube` aby troche uporządkować swoje środowisko.

```yml
version: "3"

services:
  sonar_db:
    image: postgres:15
    environment:
    #oczywiście zmienić te dane na inne dla bezpieczenstwa
      POSTGRES_USER: sonar 
      POSTGRES_PASSWORD: sonar 
      POSTGRES_DB: sonar 
    volumes:
      - sonar_db:/var/lib/postgresql
    networks:
      - jenkins
  sonarqube:
    image: sonarqube:lts-community
    environment:
      SONAR_JDBC_URL: jdbc:postgresql://sonar_db:5432/sonar
      SONAR_JDBC_USERNAME: sonar
      SONAR_JDBC_PASSWORD: sonar
    ports:
      - "9000:9000"
    volumes:
      - sonarqube_all:/opt/sonarqube
    networks:
      - jenkins
    depends_on:
      - sonar_db

volumes:
  sonarqube_all:
  sonar_db:

networks:
  jenkins:
    external: true

```

Warto przyjrzeć się linijce:

```yml
networks:
  jenkins:
    external: true
```

Która uruchomi nasze kontenery w tej samej sieci docker co jenkins. Ułatwi nam to pracę z tymi kontenerami.

Teraz możemy uruchomić nasz stos, wywołująć komendę `docker compose up -d`

### 2.2. Sonarqube - pierwsze kroki

Teraz gdy wszystko już działa możemy wstępnie skonfigurować naszego sonarqube, ktory powinien byc pod adresem `localhost:9000`

![sonar-first-login]

Aby sie zalogować wpisujemy domyślne kredki:
Login: `admin`
Password: `admin`

Następnie system poprosi nas o zmiane hasła na własne, więc to robimy.
Po wszystkim ukaże nam się taki oto dashboard:

![sonar-dashboard]

## 2.3. Integracja Jenkins z Sonarqube

Moją integracje przeprowadzę na publicznym [repozytorium z node.js](https://github.com/lily4499/lil-node-app.git)

Jednak aby wszystko zadziałało tak jak należy. Musze lekko zmodyfikować obraz w naszym kontenerze z jenkins. Mianowicie musze mu zainstalować środowisko z Node.js.

### 2.4. Dodanie zależności do obrazu Jenkins

```Dockerfile
FROM jenkins/jenkins:2.479.3-jdk17

USER root

RUN apt-get update && apt-get install -y lsb-release curl gnupg

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

RUN curl -fsSLo /usr/share/keyrings/docker-archive-keyring.asc \
    https://download.docker.com/linux/debian/gpg
RUN echo "deb [arch=$(dpkg --print-architecture) \
    signed-by=/usr/share/keyrings/docker-archive-keyring.asc] \
    https://download.docker.com/linux/debian \
    $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list
RUN apt-get update && apt-get install -y docker-ce-cli

USER jenkins

RUN jenkins-plugin-cli --plugins "blueocean docker-workflow"

```

Teraz gdy zbuduje obraz: 'docker build -t myjenkins-blueocean:latest' i uruchomie ponownie kontener za pomocą: `docker compose up -d --force-recreate` to jenkins będzie miał zainstalowany node.js.

![node-jenkins]

### 2.5. Utworzenie projektu w sonarqube

Aby utworzyć projekt w sonarqube, wybieramy opcje utworzenia ręcznie projektu.

![sonar-dashboard]

Nastepnie ustawiamy nazwę naszego projektu:

![sonar-create]

Wybieramy opcje lokalną i generujemy token dla naszego projektu:

![sonar-locally]

![sonar-token]

### 2.6. Ustawienie Jenkins pod Sonarqube

Teraz w zakładce Credentials (dokładna lokalizacja w lewym górnym rogu) dodajemy nasz token projektu z sonarqube
![jenkins-sonar-token]

Gdy to już jest za nami, musimy teraz skonfigurowac nasz serwer sonarqube, tak aby jenkins wiedzial o jego istnieniu. Skonfigurujemy to w globalnych ustawieniach systemu Jenkins:

![jenkins-sonar-server]

Warto zauważyć, że dzięki temu, że Sonarqube jest w tej samej sieci co Jenkins, możemy odwołać się bezpośrednio po nazwie kontenera **sonarqube**.
Nasz serwer póki co zezwala na anonimowe polączenia wiec zostawiamy to tak jak jest.

Jeszcze pozostaje nam skonfigurowanie narzędzia sonar-scanner. Aby to zrobić przechodzimy do ustawień Jenkins -> Plugins i instalujemy wtyczkę **SonarQube Scanner**. Gdy to zrobimy, przechodzimy do zakladki **Tools** i szukamy sekcji SonarQube Scanner.
Nadajemy jej nazwę i zostawiamy domyślny instalator.

![jenkins-sonar-scanner]

### 2.7. Jenkins Pipeline pod Sonarqube

Teraz możemy utworzyć nasz pipeline, który będzie wykorzystywał naszą konfigurację.

#### 2.7.1. Kod Pipeline

Przykładowy pipeline z połączeniem do sonarqube

```Groovy
pipeline {
    agent any
    stages {
        stage('Fetch Code') {
            steps {
                git branch: 'main', url: 'https://github.com/lily4499/lil-node-app.git'
            }
        }
        stage('SonarQube analysis') {
            steps {
                script {
                    def scannerHome = tool 'sonar-scanner'
                    
                    // Użycie SonarQube Environment
                    withSonarQubeEnv('sonarqube-server') {
                        // Pobranie tokenu z credentiali Jenkins
                        withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                            sh """
                            ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=test_sonar \
                            -Dsonar.sources=. \
                            -Dsonar.login=${SONAR_TOKEN}
                            """
                        }
                    }
                }
            }
        }
    }
}

```

##### 2.7.1.1. Etapy Pipeline

1. **Fetch Code**:
   - Pobiera kod z repozytorium GitHub (`https://github.com/lily4499/lil-node-app.git`) z gałęzi `main`.

2. **SonarQube analysis**:
   - Przeprowadza analizę kodu przy pomocy narzędzia `sonar-scanner`.
   - Używa konfiguracji SonarQube zdefiniowanej w Jenkins (zmienna `sonarqube-server`).
   - Używa tokenu SonarQube przechowywanego w Jenkins jako `sonarqube-token` do uwierzytelnienia.
   - Narzędzie `sonar-scanner` jest uruchamiane z odpowiednimi parametrami:
     - `-Dsonar.projectKey=test_sonar` — klucz projektu SonarQube.
     - `-Dsonar.sources=.` — określa źródła kodu do analizy (w tym przypadku bieżący katalog).
     - `-Dsonar.host.url=http://sonarqube:9000` — adres serwera SonarQube.
     - `-Dsonar.login=${SONAR_TOKEN}` — token dostępu do SonarQube.
  
##### 2.7.1.2. Kluczowe elementy

- **`withSonarQubeEnv('sonarqube-server')`**: Używa środowiska konfiguracyjnego SonarQube w Jenkins do ustawienia zmiennych środowiskowych (np. adresu serwera).
- **`withCredentials`**: Zabezpiecza dostęp do tokenu SonarQube, pobierając go z Jenkins Credentials.
- **`sh`**: Uruchamia polecenie w systemie Linux (lub podobnym), uruchamiając `sonar-scanner`.

##### 2.7.1.3. Uwagi

- Upewnij się, że masz odpowiednią konfigurację SonarQube w Jenkins (`sonarqube-server`).
- Token SonarQube musi być skonfigurowany w Jenkins jako `sonarqube-token` w sekcji Credentials.
- Ten pipeline zakłada, że masz już zainstalowane narzędzie `sonar-scanner` w Jenkins.

![jenkins-sonar-token]

### 3. Wynik

Gdy wszystko zostało dobrze skonfigurowane, to w naszym sonarqube zobaczymy wynik naszej inspekcji ;)

![sonar-passed]

[jenkins-first-password]: media/jenkins-first-password.png
[jenkins-init]: media/jenkins-init.png
[jenkins-plugins]: media/jenkins-plugins.png
[jenkins-creating-user]: media/jenkins-creating-user.png
[jenkins-manage]: media/jenkins-manage.png
[jenkins-plugin-docker]: media/jenkins-plugin-docker.png
[jenkins-first-pipeline]: media/jenkins-first-pipeline.png
[jenkins-pipeline-code]: media/jenkins-pipeline-code.png
[jenkins-pipeline-success]: media/jenkins-pipeline-success.png

[sonar-first-login]: media/sonar-first-login.png
[sonar-dashboard]: media/sonar-dashboard.png
[node-jenkins]: media/node-jenkins.png
[sonar-create]: media/sonar-create.png
[sonar-locally]: media/sonar-locally.png
[sonar-token]: media/sonar-token.png
[sonar-passed]: media/sonar-passed.png

[jenkins-sonar-server]: media/jenkins-sonar-server.png
[jenkins-sonar-scanner]: media/jenkins-sonar-scanner.png
[jenkins-sonar-token]: media/jenkins-sonar-token.png
