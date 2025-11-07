//	•	A scrollable list showing users that matched with the current user.

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StyleSheet, Image } from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import Header from '../components/Header';
import { Images } from '../config/images';

export default function MatchList({ navigation }) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Listen for matches where current user is involved
    const q = query(
      collection(db, 'matches'),
      where('participants', 'array-contains', auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const matchData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMatches(matchData);
    });

    return unsubscribe; // Cleanup
  }, []);

  const renderItem = ({ item }) => {
    // Find the other user in the match
    const otherUser = item.participants.find(uid => uid !== auth.currentUser.uid);
    const avatar = item.photoURL || Images.DEFAULT_AVATAR;

    return (
      <TouchableOpacity
        style={styles.matchItem}
        onPress={() =>
          navigation.navigate('ChatScreen', { chatId: item.id, otherUserId: otherUser })
        }
      >
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.name}>{item.displayName || 'User'}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Matches" />
      {matches.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No matches yet 😔</Text>
        </View>
      ) : (
        <FlatList
          data={matches}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  matchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  name: { fontSize: 18, fontWeight: '600' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#777' },
});
