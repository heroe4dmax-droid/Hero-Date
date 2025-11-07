//Handles matching logic — who likes who, and detecting mutual likes

// services/matchService.js
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { app } from '../config/firebaseConfig';

const db = getFirestore(app);

export async function likeUser(currentUserId, likedUserId) {
  await addDoc(collection(db, 'likes'), { from: currentUserId, to: likedUserId });
}

export async function checkMatch(currentUserId, likedUserId) {
  const q = query(
    collection(db, 'likes'),
    where('from', '==', likedUserId),
    where('to', '==', currentUserId)
  );
  const snapshot = await getDocs(q);
  return !snapshot.empty; // true if it’s a match!
}