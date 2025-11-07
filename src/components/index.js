//Perfect — index.js is usually the entry point of your React Native app when using Expo.

//It connects your app’s root (App.js) to the native runtime and ensures everything loads correctly.

//How it works:•	registerRootComponent(App) tells Expo to use your App.js as the root of the app.•	You don’t need to modify this file often — it stays simple and stable.•	It’s required if you ever eject your Expo project (to plain React Native
	
//Here’s the typical setup:

// index.js

import { registerRootComponent } from 'expo';
import App from './App';

// Register the main component so Expo knows where to start your app
registerRootComponent(App);