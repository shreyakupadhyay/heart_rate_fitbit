pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
    }
    
  }
  stages {
    stage('Build') {
      steps {
        sh 'echo "Build Successful"'
      }
    }
    stage('Test') {
      steps {
        sh 'yarn test a'
      }
    }
  }
}