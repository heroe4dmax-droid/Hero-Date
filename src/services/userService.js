//userService Handles user profiles — storing and retrieving user data like name, age, bio, and photos.

// services/userService.js
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { app } from '../config/firebaseConfig';

const db = getFirestore(app);

export async function saveUserProfile(uid, userData) {
  await setDoc(doc(db, 'users', uid), userData);
}

export async function getUserProfile(uid) {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}