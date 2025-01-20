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

        stage{
            steps{
                def scannerHome = tool 'sonar-scanner'

                withSonarQubeEnv('sonarqube-server'){
                    withCredentials([string(credentialsId: 'sonarqube-my-portfolio-token', variable: 'SONAR_TOKEN')]){
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
