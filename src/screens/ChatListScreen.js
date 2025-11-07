//Shows the list of active conversations (like “You matched with Sarah

// src/screens/ChatListScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import Header from '../components/Header';

export default function ChatListScreen({ navigation }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // Listen for chats where the current user is a participant
    const q = query(
      collection(db, 'chats'),
      where('participants', 'array-contains', auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chatData);
    });

    return unsubscribe; // Cleanup listener
  }, []);

  const renderItem = ({ item }) => {
    // Find the other participant
    const otherUser = item.participants.find(uid => uid !== auth.currentUser.uid);
    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => navigation.navigate('ChatScreen', { chatId: item.id, otherUserId: otherUser })}
      >
        <Text style={styles.chatText}>Chat with {otherUser}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Chats" />
      {chats.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No chats yet 😔</Text>
        </View>
      ) : (
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  chatItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  chatText: {
    fontSize: 16,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#777',
  },
});

