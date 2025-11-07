//Shows the user’s profile — their name, photo, and bio.

//Here’s the updated ProfileScreen code that fetches the user’s info from Firebase

//🧠 How it works:
	//•	It uses onAuthStateChanged(auth, callback) to listen to the current user.
	//•	Displays displayName, email, or fallback text.
	//•	Displays photoURL in the Avatar if the user has one.
	//•	Includes a Logout button that signs out and returns to the Login screen
	
// ----- Profile Screen -----

// ----- Profile Screen -----
mport React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from './src/config/firebase';
import Header from './src/components/Header';
import Avatar from './src/components/Avatar';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  // ----- Pick image -----
  const pickImage = async () => {
    // Ask for permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'You need to grant photo access.');
      return;
    }

    // Open gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      handleProfilePhotoUpdate(selectedImage);
    }
  };

  // ----- Update Firebase profile -----
  const handleProfilePhotoUpdate = async (uri) => {
    try {
      setUploading(true);

      // Update Firebase user with new photoURL
      await updateProfile(auth.currentUser, {
        photoURL: uri,
      });

      Alert.alert('Success', 'Profile picture updated!');
      setUser({ ...auth.currentUser, photoURL: uri });
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setUploading(false);
    }
  };

  // ----- Logout -----
  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Profile"
        leftIcon="chevron-back"
        onLeftPress={() => navigation.goBack()}
      />

      <View style={styles.body}>
        <TouchableOpacity onPress={pickImage} disabled={uploading}>
          <Avatar
            name={user?.displayName || user?.email || 'Anonymous User'}
            uri={user?.photoURL || null}
            size={130}
          />
        </TouchableOpacity>

        <Text style={styles.name}>
          {user?.displayName || 'No name provided'}
        </Text>
        <Text style={styles.email}>{user?.email}</Text>

        <TouchableOpacity
          onPress={pickImage}
          style={[styles.photoButton, uploading && { opacity: 0.5 }]}
          disabled={uploading}
        >
          <Text style={styles.photoText}>
            {uploading ? 'Updating...' : 'Change Photo'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 15,
  },
  email: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  photoButton: {
    marginTop: 20,
    backgroundColor: '#ff3366',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
  },
  photoText: {
    color: '#fff',
    fontWeight: '700',
  },
  logoutButton: {
    marginTop: 25,
    backgroundColor: '#333',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

