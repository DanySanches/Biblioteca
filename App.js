import React, { Component } from "react";
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import * as Font from "expo-font";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from "./screens/Login";
import BottomTabNavigator from "./components/BottomTabNavigator";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false
    };
  }

  async loadFonts() {
    try {
      await Font.loadAsync({
        Pacifico_400Regular: Pacifico_400Regular
      });
      await AsyncStorage.setItem('fontsLoaded', 'true');
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.error('Error loading fonts:', error);
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('fontsLoaded').then(value => {
      if (value === 'true') {
        this.setState({ fontLoaded: true });
      } else {
        this.loadFonts();
      }
    }).catch(error => {
      console.error('Error checking fonts loaded:', error);
      this.loadFonts();
    });
  }

  render() {
    const { fontLoaded } = this.state;
    if (fontLoaded) {
      return <AppContainer />;
    }
    return null;
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  Login: {
    screen: LoginScreen
  },
  BottomTab: {
    screen: BottomTabNavigator
  },
},
{ initialRouteName: "Login" });

const AppContainer = createAppContainer(AppSwitchNavigator);