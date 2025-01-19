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
