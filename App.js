//Perfect 🚀 — here’s a clean App.js for your dating app that ties everything together.
//It loads the navigation, configures fonts (if needed), and sets up the app entry point

//Awesome — here’s a solid starting point for your App.js file, designed for your dating app using Expo + React Navigation and the Header + Avatar components you already have.

//This gives you a full working structure with:•	A navigation container•	A home screen•	A profile screen•	Shared Header and Avatar components

//⚙️ To make this work, install navigation
//In your terminal (or Expo shell):
//npx expo install @react-navigation/native
//npx expo install @react-navigation/stack
//npx expo install react-native-screens react-native-safe-area-context

// Perfect 😎 — here’s how you can add a Login Screen that connects smoothly with your Home and Profile screens.

//We’ll make it functional enough to simulate logging in and then redirecting to the Home screen after pressing “Login.

//✅ What’s new:
	//•	A Login screen with email and password input.
	//•	Simple validation before navigating.
	//•	Uses navigation.replace to prevent going back after login.
	//•	Smooth integration with your other screens.

//⸻

//Would you like me to show the next step — adding Firebase Authentication (so the login actually connects to a database instead of just simulating)?

//	Register new users (createUserWithEmailAndPassword)
	//•	Log in existing users (signInWithEmailAndPassword)
	//•	Automatically navigate to the home screen on success
// App.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './src/config/firebase';
import Header from './src/components/Header';
import Avatar from './src/components/Avatar';

const Stack = createStackNavigator();

// ----- Login Screen -----
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Success', 'Account created! You can now log in.');
        setIsRegistering(false);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigation.replace('Home');
      }
    } catch (error) {
      Alert.alert('Authentication Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.title}>{isRegistering ? 'Create Account 💕' : 'Welcome Back 💖'}</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>
            {isRegistering ? 'Sign Up' : 'Login'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          {isRegistering ? (
            <>
              Already have an account?{' '}
              <Text
                style={styles.link}
                onPress={() => setIsRegistering(false)}
              >
                Log in
              </Text>
            </>
          ) : (
            <>
              Don’t have an account?{' '}
              <Text
                style={styles.link}
                onPress={() => setIsRegistering(true)}
              >
                Sign up
              </Text>
            </>
          )}
        </Text>
      </View>
    </SafeAreaView>
  );
}

// ----- Home Screen -----
function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Home"
        rightIcon="person-circle-outline"
        onRightPress={() => navigation.navigate('Profile')}
      />
      <View style={styles.body}>
        <Text style={styles.text}>Welcome to the Dating App ❤️</Text>
      </View>
    </SafeAreaView>
  );
}

// ----- Profile Screen -----
function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Profile"
        leftIcon="chevron-back"
        onLeftPress={() => navigation.goBack()}
      />
      <View style={styles.body}>
        <Avatar
          name="Alex Johnson"
          uri="https://randomuser.me/api/portraits/men/75.jpg"
          size={120}
        />
        <Text style={styles.name}>Alex Johnson</Text>
        <Text style={styles.bio}>Adventurous, kind, and love traveling 🌍</Text>
      </View>
    </SafeAreaView>
  );
}

// ----- Main App -----
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ----- Styles -----
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    color: '#ff3366',
  },
  input: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#ff3366',
    width: '100%',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  note: {
    marginTop: 20,
    color: '#555',
  },
  link: {
    color: '#ff3366',
    fontWeight: '600',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 15,
  },
  bio: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 5,
  },
});