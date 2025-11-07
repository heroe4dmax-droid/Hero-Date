//If you’re using Firebase (which is great for dating apps: authentication, Firestore database, storage, and messaging), this file initializes your Firebase app

// config/firebaseConfig.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'your-app.firebaseapp.com',
  projectId: 'your-app',
  storageBucket: 'your-app.appspot.com',
  messagingSenderId: '1234567890',
  appId: '1:1234567890:web:abcdef123456',
};

export const app = initializeApp(firebaseConfig);

//Replace those values with your actual Firebase credentials (you get them from your Firebase console