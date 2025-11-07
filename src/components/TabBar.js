//	•	Custom bottom navigation bar (e.g., Home, Messages, Profile tabs).

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import MatchList from '../screens/MatchList';
import ChatListScreen from '../screens/ChatListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Icons } from '../config/icons';

const Tab = createBottomTabNavigator();

export default function TabBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#ff3366',
        tabBarInactiveTintColor: '#555',
        tabBarStyle: { backgroundColor: '#fff', height: 60, paddingBottom: 5 },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = Icons.TAB.HOME;
              break;
            case 'Matches':
              iconName = Icons.TAB.CHAT;
              break;
            case 'Chats':
              iconName = Icons.TAB.CHAT;
              break;
            case 'Profile':
              iconName = Icons.TAB.PROFILE;
              break;
            default:
              iconName = 'ellipse';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Matches" component={MatchList} />
      <Tab.Screen name="Chats" component={ChatListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
