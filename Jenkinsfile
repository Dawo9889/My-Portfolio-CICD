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
                    args '--network host'
                }
            }
            steps {
                script {
                    checkout scm
                }
            }
        }

        // stage('Install Dependencies') {
        //     agent {
        //         docker {
        //             image 'node:18'
        //             args '--network host'
        //         }
        //     }
        //     steps {
        //         script {
        //             dir('./app') {
        //                 sh 'npm install'
        //             }
        //         }
        //     }
        // }

        // stage('Build') {
        //     agent {
        //         docker {
        //             image 'node:18'
        //             args '--network host'
        //         }
        //     }
        //     steps {
        //         script {
        //             dir('./app') {
        //                 sh 'npm run build' 
        //             }
        //         }
        //     }
        // }

        // stage('Analyze code with SonarQube') {
        //     agent any
        //     steps {
        //         script {
        //             def scannerHome = tool 'sonar-scanner' 

        //             withSonarQubeEnv('sonarqube-server') {
        //                 withCredentials([string(credentialsId: 'sonarqube-my-portfolio-token', variable: 'SONAR_TOKEN')]) {
        //                     dir('./app') {
        //                         sh """
        //                             ${scannerHome}/bin/sonar-scanner \
        //                             -Dsonar.projectKey=my-portfolio \
        //                             -Dsonar.sources=. \
        //                             -Dsonar.login=${SONAR_TOKEN}  
        //                         """
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }

        // // stage('Check Quality Gate') {
        // //     agent any
        // //     steps {
        // //         script {
        // //             waitForQualityGate abortPipeline: true 
        // //         }
        // //     }
        // // }

        // stage('Building and pushing container image') {
        //     agent any
        //     when {
        //         allOf {
        //             expression {
        //                 currentBuild.result == null || currentBuild.result == 'SUCCESS'  
        //             }
        //         }
        //     }
        //     steps {
        //         script {
        //             withCredentials([usernamePassword(credentialsId: 'docker-hub-access-token', 
        //                                    usernameVariable: 'DOCKERHUB_CREDENTIALS_USR', 
        //                                    passwordVariable: 'DOCKERHUB_CREDENTIALS_PSW')]) {
                        
        //                 sh """
        //                     docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW}
        //                     docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
        //                     docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
        //                 """
        //             }
        //         }
        //     }
        // }

        stage("Deploying app on a 'production server'") {
            agent any
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-access-token', 
                                                    usernameVariable: 'DOCKERHUB_CREDENTIALS_USR', 
                                                    passwordVariable: 'DOCKERHUB_CREDENTIALS_PSW')]) {
                        sshagent(['deploy_ssh_user']) {
                            sh """
                                ssh -o StrictHostKeyChecking=no deploy@192.168.1.134 << EOF

                                # Logowanie do Docker Hub
                                echo "${DOCKERHUB_CREDENTIALS_PSW}" | docker login -u "${DOCKERHUB_CREDENTIALS_USR}" --password-stdin

                                # Pobranie najnowszego obrazu Dockera
                                docker pull ${DOCKER_IMAGE}:${DOCKER_TAG}

                                # Zatrzymanie i usunięcie starego kontenera (jeśli istnieje)
                                docker stop app || true
                                docker rm app || true

                                # Uruchomienie nowego kontenera
                                docker run -d --name my-portfolio-app -p 4500:3000 ${DOCKER_IMAGE}:${DOCKER_TAG}

                                EOF
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
