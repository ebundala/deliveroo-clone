import { View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable  from 'react-native-animatable'
import * as Progress from "react-native-progress";
import { NavigationProp, useNavigation } from '@react-navigation/native';
export default function PrepareOrderScreen() {
    const navigation:NavigationProp<{delivery:undefined}> = useNavigation()
    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate("delivery");
        },5000)
    })
  return (
    <SafeAreaView className='bg-[#35b8b2] flex-1 justify-center items-center'>
    
     < Animatable.Image
     className='h-60 w-60'
     animation="slideInUp"
     iterationCount={1}
     source={require("../assets/rider.png")} />
    <Animatable.Text animation="slideInUp" iterationCount={1} 
    className="text-lg my-10 text-white font-bold text-center">
        Waiting for restaurant to accept your order
    </Animatable.Text>
    <Progress.Circle size={60} indeterminate={true} color="white"></Progress.Circle>
    </SafeAreaView>
  )
}