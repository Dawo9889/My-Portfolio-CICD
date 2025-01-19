pipeline{
    agent any
    triggers{
        gitHubPush();
    }
    
    stages{
        stage('Output line'){
            script{
                echo 'Hello from pipeline'
            }
        }
    }
}