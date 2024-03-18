import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';

import TransactionScreen from "../screens/Transaction";
import SearchScreen from "../screens/Search";

const Tab = createBottomTabNavigator();

export default class BottomTabNavigator extends Component {
  state = {
    dataFromStorage: null,
  };

  async componentDidMount() {
    try {
      const data = await AsyncStorage.getItem('example_key');
      if (data !== null) {
        this.setState({ dataFromStorage: data });
      }
    } catch (error) {
      console.error('Error reading data from AsyncStorage:', error);
    }
  }

  saveDataToStorage = async () => {
    try {
      await AsyncStorage.setItem('example_key', 'example_value');
      console.log('Data saved to AsyncStorage');
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  render() {
    const { dataFromStorage } = this.state;

    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Transação") {
                iconName = "book";
              } else if (route.name === "Pesquisa") {
                iconName = "search";
              }

              return (
                <Ionicons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            }
          })}
          tabBarOptions={{
            activeTintColor: "#FFFFFF",
            inactiveTintColor: "black",
            style: {
              height: 130,
              borderTopWidth: 0,
              backgroundColor: "#5653d4"
            },
            labelStyle: {
              fontSize: 20,
              fontFamily: "Pacifico_400Regular"
            },
            labelPosition: "beside-icon",
            tabStyle: {
              marginTop: 2,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 30,
              borderWidth: 2,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#5653d4"
            }
          }}
        >
          <Tab.Screen name="Transação" component={TransactionScreen} />
          <Tab.Screen name="Pesquisa" component={SearchScreen} />
        </Tab.Navigator>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Data from AsyncStorage: {dataFromStorage}</Text>
          <Button title="Salvar Dados" onPress={this.saveDataToStorage} />
        </View>
      </NavigationContainer>
    );
  }
}
