//Allows users to update their profile info and upload a photo

// src/screens/EditProfileScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { updateProfile, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import Header from '../components/Header';
import Avatar from '../components/Avatar';

export default function EditProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [uploading, setUploading] = useState(false);

  // Load user data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setDisplayName(currentUser.displayName || '');
      
      // Load Firestore profile data
      const docRef = doc(db, 'users', currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setAge(data.age?.toString() || '');
        setBio(data.bio || '');
      }
    });

    return unsubscribe;
  }, []);

  // Pick profile image
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'You need to allow photo access.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      await uploadImage(imageUri);
    }
  };

  // Upload image to Firebase Storage
  const uploadImage = async (uri) => {
    try {
      setUploading(true);
      const response = await fetch(uri);
      const blob = await response.blob();
      const fileRef = ref(storage, `profilePictures/${auth.currentUser.uid}/${uuidv4()}.jpg`);
      await uploadBytes(fileRef, blob);
      const downloadURL = await getDownloadURL(fileRef);

      await updateProfile(auth.currentUser, { photoURL: downloadURL });
      setUser({ ...auth.currentUser, photoURL: downloadURL });
      Alert.alert('Success', 'Profile photo updated!');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setUploading(false);
    }
  };

  // Save profile updates
  const handleSave = async () => {
    if (!displayName) {
      Alert.alert('Error', 'Name cannot be empty.');
      return;
    }

    try {
      // Update Auth display name
      await updateProfile(auth.currentUser, { displayName });

      // Update Firestore data
      await setDoc(
        doc(db, 'users', auth.currentUser.uid),
        { age: parseInt(age) || null, bio },
        { merge: true }
      );

      Alert.alert('Success', 'Profile updated!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Edit Profile"
        leftIcon="chevron-back"
        onLeftPress={() => navigation.goBack()}
      />

      <View style={styles.body}>
        <TouchableOpacity onPress={pickImage} disabled={uploading}>
          <Avatar
            name={displayName}
            uri={user?.photoURL}
            size={120}
          />
        </TouchableOpacity>

        {uploading && <ActivityIndicator size="large" color="#ff3366" style={{ marginVertical: 10 }} />}

        <TextInput
          placeholder="Name"
          style={styles.input}
          value={displayName}
          onChangeText={setDisplayName}
        />

        <TextInput
          placeholder="Age"
          style={styles.input}
          keyboardType="number-pad"
          value={age}
          onChangeText={setAge}
        />

        <TextInput
          placeholder="Bio"
          style={[styles.input, { height: 100 }]}
          multiline
          value={bio}
          onChangeText={setBio}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  body: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  input: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginTop: 15,
  },
  saveButton: {
    marginTop: 25,
    backgroundColor: '#ff3366',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  saveText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});