pipeline {
    agent none 

    environment {
        DOCKER_IMAGE = 'baitazar/my-portfolio-app'  
        DOCKER_TAG = 'latest'
        REGISTRY_CREDENTIALS = 'docker-hub-access-token' 
        DOCKER_REGISTRY = 'registry.hub.docker.com' 
    }

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

        stage('Analyze code with SonarQube') {
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

        stage('Build Docker Image') {
            agent any
            when {
                expression {
                    return currentBuild.result == 'SUCCESS'  
                }
            }
            steps {
                script {
                    node {
                        sh """
                            docker build -t $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG ./app  
                        """
                    }
                }
            }
        }

        stage('Push Docker Image') {
            agent any
            steps {
                script {
                    node {
                        withDockerRegistry([credentialsId: REGISTRY_CREDENTIALS, url: DOCKER_REGISTRY]) {
                            sh """
                                docker push $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG  
                            """
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
