//Perfect — here’s the standard babel.config.js for an Expo React Native app (like your dating app project).

//This file tells Babel how to compile your JavaScript so it runs correctly on different devices

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@services": "./src/services",
            "@config": "./src/config",
            "@navigation": "./src/navigation",
            "@utils": "./src/utils",
          },
        },
      ],
    ],
  };
};

//•	presets:
//"babel-preset-expo" is required by Expo to handle modern JavaScript, JSX, and React Native syntax.
	//•	plugins → module-resolver:
//This allows you to import files without using long relative paths.
//For example

//import LoginScreen from "@screens/LoginScreen";
//import { COLORS } from "@config/theme";

//instead of

//import LoginScreen from "../../screens/LoginScreen";