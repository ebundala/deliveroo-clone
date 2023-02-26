import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { StarIcon } from 'react-native-heroicons/solid';
import { MapPinIcon } from 'react-native-heroicons/outline';
import { useNavigation,NavigationProp } from '@react-navigation/native';
import { SanityImageAssetDocument } from '@sanity/client';
export type TRestaurantCardProps = {
    id:string
    imageUrl:string
    name:string
    rating:number
    address:string
    description:string
    category:string
    dishes:{_id:string,name:string,description:string,image:SanityImageAssetDocument,price:number}[]
    lng:number
    lon:number
}
export function RestaurantCard({ id, imageUrl, name, rating, address, description, category, dishes, lng, lon }: TRestaurantCardProps) {
    const navigation:NavigationProp<{restaurant:TRestaurantCardProps}>  = useNavigation();
    return (
        <TouchableOpacity onPress={()=>{
            navigation.navigate("restaurant" ,{
            id, imageUrl, name, rating, address, description, category, dishes, lng, lon 
        })
        }} className='bg-white mr-3 shadow'>
            <Image source={{ uri: imageUrl }}
                className="h-64 w-64 rounded-sm" />
            <View className='px-3 pb-4'>
                <Text className='font-bold text-lg pt-2'>{name}</Text>
                <View className='flex-row items-center space-x-1'>
                    <StarIcon color="green" opacity={0.5} size={22} />

                    <Text className='text-green-500'>{rating}</Text>
                    <Text className=' text-xs text-gray-500'>{category}</Text>
                </View>
                <View className='flex-row items-center'>
                    <MapPinIcon color="gray" opacity={0.4} size={22} />
                    <Text className='text-xs text-gray-500'>{address}</Text>
                </View>
            </View>

        </TouchableOpacity>
    );
}
