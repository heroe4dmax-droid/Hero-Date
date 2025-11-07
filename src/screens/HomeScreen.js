//Displays the main feed (swipe cards, like Tinder).
//	•	Displays stacked profile cards using your ProfileCard component.•	Lets you swipe left (❌) or right (❤️) using touch gestures.•	When a swipe passes the threshold, the card animates off-screen and the next card appears.•	Once all cards are gone, it shows "No more profiles 😢"

import React, { useState, useRef } from 'react';
import {
  View,
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import ProfileCard from '../components/ProfileCard';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen() {
  const [profiles, setProfiles] = useState([
    {
      id: '1',
      name: 'Emily, 26',
      bio: 'Loves hiking, sushi, and late-night talks.',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
      id: '2',
      name: 'Sophia, 29',
      bio: 'Coffee addict ☕ | Bookworm 📚 | Adventure seeker 🌍',
      image: 'https://randomuser.me/api/portraits/women/75.jpg',
    },
    {
      id: '3',
      name: 'Mia, 24',
      bio: 'Music, dancing, and beach sunsets 🌅',
      image: 'https://randomuser.me/api/portraits/women/79.jpg',
    },
  ]);

  const position = useRef(new Animated.ValueXY()).current;

  // Handle swipe movement
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: position.x, dy: position.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gesture) => {
        if (gesture.dx > 120) {
          swipeRight();
        } else if (gesture.dx < -120) {
          swipeLeft();
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const swipeRight = () => {
    Animated.timing(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => nextProfile());
  };

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => nextProfile());
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const nextProfile = () => {
    setProfiles((prev) => prev.slice(1)); // remove the top card
    position.setValue({ x: 0, y: 0 }); // reset card position
  };

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-15deg', '0deg', '15deg'],
  });

  const animatedCardStyle = {
    transform: [...position.getTranslateTransform(), { rotate }],
  };

  return (
    <View style={styles.container}>
      {profiles.length > 0 ? (
        profiles
          .map((profile, index) => {
            if (index === 0) {
              return (
                <Animated.View
                  key={profile.id}
                  style={[styles.card, animatedCardStyle]}
                  {...panResponder.panHandlers}
                >
                  <ProfileCard
                    name={profile.name}
                    bio={profile.bio}
                    image={profile.image}
                  />
                </Animated.View>
              );
            } else {
              return (
                <View key={profile.id} style={[styles.card, { top: 10 * index }]}>
                  <ProfileCard
                    name={profile.name}
                    bio={profile.bio}
                    image={profile.image}
                  />
                </View>
              );
            }
          })
          .reverse()
      ) : (
        <Text style={styles.noProfiles}>No more profiles 😢</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
  },
  noProfiles: {
    fontSize: 18,
    color: '#555',
  },
});

