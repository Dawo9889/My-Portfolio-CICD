pipeline {
    agent none 

    environment {
        DOCKER_IMAGE = 'baitazar/my-portfolio-app'  
        DOCKER_TAG = 'latest'
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

        stage('Building and pushing container image') {
            when {
                allOf {
                    expression {
                        currentBuild.result == null || currentBuild.result == 'SUCCESS'  
                    }
                }
            }
            steps {
                script {
                    withCredentials([string(credentialsId: 'docker-hub-access-token', variable: 'DOCKERHUB_CREDENTIALS')]) {
                        
                        sh """
                            docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}
                            docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                            docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                        """
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
