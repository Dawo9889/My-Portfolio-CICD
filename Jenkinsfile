pipeline {
    agent any
    triggers {
        githubPush() // Użycie funkcji githubPush() do triggerowania na push
    }

    stages {
        stage('Output line') {
            steps {
                script {
                    echo 'Hello from pipeline'
                }
            }
        }
    }
}
