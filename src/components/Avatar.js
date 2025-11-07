//•	Circular profile images used throughout the app (small version for chat lists, etc.).

// src/components/Avatar.js
//How it works:uri: image link (user profile picture)•	size: optional, adjusts avatar dimensions•	border: adds a colored border if true

//ex usage:
//import Avatar from '../components/Avatar';

//<Avatar uri="https://example.com/profile.jpg" size={80} />;


//here’s an upgraded version of Avatar.js that includes a default avatar (for when the user hasn’t uploaded a photo yet). It also supports initials (like “AB” for “Alex Brown”) if no image is provided

//how to use it:
//import Avatar from '../components/Avatar';

// with image
//<Avatar uri="https://example.com/profile.jpg" name="Sarah Johnson" size={90} />

// without image (shows initials)
//<Avatar name="David Smith" size={90} />

// no name or image (shows emoji)
//<Avatar size={90} />



// src/components/Avatar.js

import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

export default function Avatar({
  uri,
  name = '',
  size = 100,
  border = true,
}) {
  const initials = name
    ? name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '';

  const hasImage = !!uri;

  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, borderRadius: size / 2 },
        border && styles.border,
      ]}
    >
      {hasImage ? (
        <Image
          source={{ uri }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[
            styles.defaultAvatar,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        >
          <Text style={[styles.initials, { fontSize: size / 2.8 }]}>
            {initials || '👤'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    borderWidth: 2,
    borderColor: '#ff3366',
  },
  defaultAvatar: {
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: '#888',
    fontWeight: '600',
  },
});

