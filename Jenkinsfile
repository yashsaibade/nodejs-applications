pipeline {
    agent any

    environment {
        MONGODB_URL  = credentials('MONGODB_URL')
        JWTSECRETE = credentials('JWTSECRETE')
        EXPIRES_IN = credentials('EXPIRES_IN')
        EMAIL      = credentials('EMAIL')
        PASSWORD   = credentials('PASSWORD')
        PORT       = "5000"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/yashsaibade/nodejs-applications.git'
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                docker build --no-cache -t node-backend-app .
                '''
            }
        }

        stage('Docker Run') {
            steps {
                sh '''
                docker rm -f node-backend || true

                docker run -d \
                  -p 5000:5000 \
                  --name node-backend \
                  -e PORT=$PORT \
                  -e MONGO_URL=$MONGO_URL \
                  -e JWTSECRETE=$JWTSECRETE \
                  -e EXPIRES_IN=$EXPIRES_IN \
                  -e EMAIL=$EMAIL \
                  -e PASSWORD="$PASSWORD"  \
                  node-backend-app
                '''
            }
        }
    }
}
