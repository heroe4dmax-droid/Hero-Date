import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ProfileCard({ name, bio, image }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.bio}>{bio}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
  bio: {
    color: '#555',
    textAlign: 'center',
  },
});