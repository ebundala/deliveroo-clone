import { View, Text, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XMarkIcon } from 'react-native-heroicons/solid'
import * as Progress from "react-native-progress";
import { PrimaryColor } from '../constants/primaryColor'
import MapView,{MAP_TYPES, Marker,} from "react-native-maps";

export default function DeliveryScreen() {
    const restaurant = useSelector(selectRestaurant)
    const navigation:NavigationProp<{home:undefined}> = useNavigation();

  return (
    <View className='bg-[#35b8b2] flex-1'>
      <SafeAreaView className='z-50'>
        <View className='flex-row justify-between items-center p-5'>
        <TouchableOpacity onPress={()=>navigation.navigate("home")}>
        <XMarkIcon color="white"/>
        </TouchableOpacity>
        <Text className='font-light text-white text-lg'>Order Help</Text>
        </View>
        <View className='bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md'>
           <View className='flex-row justify-between'>
            <View>
                <Text className='text-lg text-gray-400 '>Estimated Arrival</Text>
                <Text className='text-3xl font-bold'>45-55 minutes</Text>

            </View>
            <Image className='h-20 w-20' source={require("../assets/rider.png")}/>
            </View>
            <Progress.Bar color={PrimaryColor} indeterminate={true}></Progress.Bar>
        <Text className='text-gray-500 mt-3'>Your order at {restaurant?.name} is being prepared</Text>
        </View>
      </SafeAreaView>
      <MapView 
      initialRegion={
        {
            latitude:restaurant!.lon!,
            longitude:restaurant!.lng!,
            latitudeDelta:0.005,
            longitudeDelta:0.005
        }
      }
      className="flex-1 -mt-10 z-0"
      mapType={MAP_TYPES.MUTEDSTANDARD}
      >
        <Marker 
        coordinate={{
            latitude:restaurant!.lon,
            longitude:restaurant!.lng
        }}
        title={restaurant?.name}
        description={restaurant?.description}
        identifier="origin"
        pinColor={PrimaryColor}
        />
      </MapView>
      <SafeAreaView className='bg-white flex-row items-center  space-x-5 h-20 '>
        <Image source={require("../assets/rider.png")}
        className="h-12 w-12 bg-gray-300  rounded-full ml-5"
        />
        <View className='flex-1 '>
            <Text className='text-lg '>John Doe</Text>
            <Text className='text-gray-400 '>Your Rider</Text>
        </View>
        <Text className='text-[#35b8b2] mr-5 font-bold'>Call</Text>
      </SafeAreaView>
    </View>
  )
}