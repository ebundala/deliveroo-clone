import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RestaurantScreen from './screens/RestaurantScreen';
import { store } from './store/store'
import { Provider } from 'react-redux'
import BasketScreen from './screens/BasketScreen';
import PrepareOrderScreen from './screens/PrepareOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <SafeAreaProvider>
    <StatusBar style='auto'/>
   
    <NavigationContainer >             
    <Stack.Navigator >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="restaurant" component={RestaurantScreen} />
      <Stack.Screen name="basket" component={BasketScreen} options={{
        presentation: "modal",headerShown:false
      }}/>
       <Stack.Screen name="prepareOrder" component={PrepareOrderScreen} options={{
        presentation: 'fullScreenModal',headerShown:false
      }}/>
        <Stack.Screen name="delivery" component={DeliveryScreen} options={{
        presentation: 'fullScreenModal',headerShown:false
      }}/>
    </Stack.Navigator>
  </NavigationContainer>
 
  </SafeAreaProvider>
  </Provider>
  );
}

