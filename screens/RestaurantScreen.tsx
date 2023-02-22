import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { TRestaurantCardProps } from '../components/RestaurantCard';
import { ArrowLeftIcon, ChevronRightIcon, QuestionMarkCircleIcon, MapPinIcon, StarIcon } from 'react-native-heroicons/solid';

import { PrimaryColor } from '../constants/primaryColor';
import { DishRow } from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';

export default function RestaurantScreen() {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    }, []);
    const { params: { id, imageUrl, name, rating, address, description, category, dishes, lng, lon } } = useRoute<RouteProp<{ restaurant: TRestaurantCardProps }>>();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setRestaurant({ id, imageUrl, name, rating, address, description, category, dishes, lng, lon }))
    }, [])

    return (
        <>
            <BasketIcon />
            <ScrollView >
                <View className='relative'>
                    <Image
                        className='w-full h-56 bg-gray-300 p-4'
                        source={{
                            uri: imageUrl
                        }} />
                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }} className='absolute top-14 left-5 bg-gray-100 p-2 rounded-full'>
                        <ArrowLeftIcon size={28} color={PrimaryColor} />
                    </TouchableOpacity>
                </View>
                <View className='bg-white'>
                    <View className='px-4 pt-4'>
                        <Text className='text-3xl font-bold '>
                            {name}
                        </Text>
                        <View className='flex-row spax-x-2 my-1'>
                            <View className='flex-row items-center space-x-1'>
                                <StarIcon color="green" opacity={0.5} size={22} />
                                <Text className='text-xs text-gray-500'>
                                    <Text className='text-green-500'>{rating}</Text> . {category}
                                </Text>
                            </View>
                            <View className='flex-row items-center space-x-1'>
                                <MapPinIcon color="gray" opacity={0.4} size={22} />
                                <Text className='text-xs text-gray-500'>
                                    Nearby . {address}
                                </Text>
                            </View>
                        </View>
                        <Text className='text-gray-500 mt-2'>{description}</Text>
                    </View>
                    <TouchableOpacity className='flex-row p-4 items-center space-x-2 border-y border-gray-300'>
                        <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
                        <Text className='pt-2 flex-1  font-bold leading-3'>Have a food allergy?</Text>
                        <ChevronRightIcon color={PrimaryColor} />
                    </TouchableOpacity>
                </View>
                <View className='pb-36'>
                    <Text className='px-4 pt-4 mb-3 font-bold text-xl'>Menu</Text>
                    {/* dish rows */}
                    {dishes?.map((v) => <DishRow key={v._id} {...{ ...v, id: v._id }} />)}
                </View>
            </ScrollView>
        </>
    )
}




