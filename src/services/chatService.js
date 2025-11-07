//Handles sending and receiving messages between matched users

// services/chatService.js
import { getFirestore, collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import { app } from '../config/firebaseConfig';

const db = getFirestore(app);

export async function sendMessage(chatId, senderId, message) {
  await addDoc(collection(db, 'chats', chatId, 'messages'), {
    senderId,
    message,
    timestamp: new Date(),
  });
}

export function listenForMessages(chatId, callback) {
  const q = query(collection(db, 'chats', chatId, 'messages'));
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => doc.data());
    callback(messages);
  });
}