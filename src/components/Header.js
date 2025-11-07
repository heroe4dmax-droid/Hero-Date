//	A top bar with your app name or icons (like a heart or chat bubble ).
//Nice — Header.js is another core component of your dating app. It’s usually placed in the src/components folder and used at the top of screens (like Home, Profile, or Chat).

//Here’s a clean, reusable version for your Expo app

//🧠 How it works:•	title: text in the middle (screen name)•	leftIcon & rightIcon: icons from Expo’s Ionicons library•	onLeftPress / onRightPress: actions when pressed•	showIcons: toggle icons (useful for simple headers
 
 //usage examples:
 import Header from '../components/Header';

<Header
title="Profile"
 leftIcon="chevron-back"
  rightIcon="create-outline"
  onLeftPress={() => console.log('Back pressed')}
  onRightPress={() => console.log('Edit pressed')}
/>


// src/components/Header.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({
  title = 'Dating App',
  leftIcon = 'chevron-back',
  rightIcon = 'settings-outline',
  onLeftPress,
  onRightPress,
  showIcons = true,
}) {
  return (
    <View style={styles.container}>
      {showIcons ? (
        <TouchableOpacity onPress={onLeftPress} style={styles.iconButton}>
          <Ionicons name={leftIcon} size={26} color="#ff3366" />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}

      <Text style={styles.title}>{title}</Text>

      {showIcons ? (
        <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
          <Ionicons name={rightIcon} size={26} color="#ff3366" />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  iconButton: {
    padding: 6,
  },
  iconPlaceholder: {
    width: 26,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
});

