import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
    <StatusBar style='auto'/>
    <NavigationContainer>             
    <Stack.Navigator>
      <Stack.Screen name="home" component={HomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  </SafeAreaProvider>
  );
}

