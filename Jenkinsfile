pipeline {
  agent {
    docker { image 'node:latest' }
  }
  stages {
    stage('Install') {
      steps { bath 'npm install' }
    }

    stage('Test') {
      parallel {
        stage('Static code analysis') {
            steps { bath 'npm run-script lint' }
        }
        stage('Unit tests') {
            steps { bath 'npm run-script test' }
        }
      }
    }

    stage('Build') {
      steps { bath 'npm run-script build' }
    }
  }
}
