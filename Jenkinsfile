pipeline {
   agent any
   stages {
      stage('NPM Setup') {
      steps {
         sh 'npm install'
      }
   }
   stage('Stage Web Build') {
      steps {
        sh 'npm run build --prod'
    }
  }

 }
}
