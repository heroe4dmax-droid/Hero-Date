//Displays all users that matched with the current user. Displays a scrollable list of matches with avatars and names.•	Each item is pressable — tapping opens the ChatScreen (via navigation.navigate('Chat')).•	The lastMessage field gives users a preview of their last chat or greeting.

import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function MatchesScreen({ navigation }) {
  const matches = [
    {
      id: '1',
      name: 'Sophia, 29',
      image: 'https://randomuser.me/api/portraits/women/75.jpg',
      lastMessage: 'Hey there 👋',
    },
    {
      id: '2',
      name: 'Mia, 24',
      image: 'https://randomuser.me/api/portraits/women/79.jpg',
      lastMessage: 'You have great taste in music 🎶',
    },
    {
      id: '3',
      name: 'Emily, 26',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      lastMessage: 'Wanna grab coffee sometime? ☕',
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.matchItem}
      onPress={() => navigation.navigate('Chat', { user: item })}
    >
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Matches 💘</Text>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  matchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    color: '#777',
    marginTop: 3,
  },
});


