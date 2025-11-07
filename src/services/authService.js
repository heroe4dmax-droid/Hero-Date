//Handles user authentication — logging in, signing up, and logging out.If you use Firebase, this file talks to Firebase’s auth module.

// services/authService.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from '../config/firebaseConfig'; // if you’re using Firebase

const auth = getAuth(app);

export async function registerUser(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function loginUser(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function logoutUser() {
  return await signOut(auth);
}