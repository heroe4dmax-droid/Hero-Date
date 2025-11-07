//Handles saving and loading local data (like tokens or preferences

// utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveData(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getData(key) {
  const value = await AsyncStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

export async function removeData(key) {
  await AsyncStorage.removeItem(key);
}