import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RestaurantScreen from './screens/RestaurantScreen';
import { store } from './store/store'
import { Provider } from 'react-redux'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <SafeAreaProvider>
    <StatusBar style='auto'/>
    <NavigationContainer>             
    <Stack.Navigator>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="restaurant" component={RestaurantScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  </SafeAreaProvider>
  </Provider>
  );
}

