import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/Home';
import MeteorScreen from './screens/meteors';
import ISSLocationScreen from './screens/ISSLocation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'
                       screenOptions={{headerShown: false}}>
        <Stack.Screen name= "Home" component={HomeScreen}/>
        <Stack.Screen name= "ISSLocation" component={ISSLocationScreen}/>
        <Stack.Screen name= "Meteors" component={MeteorScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
