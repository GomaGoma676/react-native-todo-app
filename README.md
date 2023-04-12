## Project setup : 
### 1-1. yarn + expo-cli install
~~~
sudo npm i -g yarn
sudo npm i -g expo-cli
~~~
~~~
expo --version
4.12.10以降でexpo sdk43が自動的にインストールされます。
~~~
### 1-2.  expo init
~~~
expo init todos-app
~~~
### 1-3.  Redux Toolkit
    yarn add @reduxjs/toolkit
    yarn add react-redux
### 1-4.  prettierの設定 : settingsでRequire Config + Format On Saveにチェック
    touch .prettierrc
~~~
{
    "singleQuote": true,
    "trailingComma": "all"
}
~~~  
### 1-5.  Tailwind CSS + date-fns
    yarn add tailwind-rn@3.0.1
    yarn add date-fns
 ~~~
↓settings.json
"tailwindCSS.experimental.classRegex": ["tw\\('([^')]*)"],
~~~
### 1-6.  React native navigation
    yarn add @react-navigation/native
    yarn add @react-navigation/native-stack
    expo install react-native-screens react-native-safe-area-context
    yarn add react-native-gesture-handler
    expo install dotenv expo-constants
### 1-7.  Firebase setup  
~~~
expo install firebase
~~~
### 1-8.  .env file
~~~
API_KEY=***
AUTH_DOMAIN=***
PROJECT_ID=***
STORAGE_BUCKET=***
MESSAGING_SENDER_ID=***
APP_ID=***
~~~ 
### 1-9. app.json -> app.config.ts
~~~
extra: {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
},
~~~
### 1-10. Security rules in Cloud Firestore
~~~
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/tags/{tagId=**} {
     allow read, write:  if request.auth.uid != null && request.auth.uid == userId;
    }
  }
}
~~~
