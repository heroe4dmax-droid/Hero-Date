//Stores environment-related variables (useful if you deploy to different stages like dev, staging, production

export const ENV = {
  mode: "development", // or "production"
  apiKey: "YOUR_API_KEY_HERE",
  firebaseConfig: {
    apiKey: "FIREBASE_API_KEY",
    authDomain: "yourapp.firebaseapp.com",
    projectId: "yourapp",
    storageBucket: "yourapp.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
  }
};

//You can then import this anywhere
//import { ENV } from '../config/env';
//console.log('App running in:', ENV.MODE);