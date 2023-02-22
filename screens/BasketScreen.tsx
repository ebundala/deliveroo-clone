import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import { useNavigation } from '@react-navigation/native';
import { selectRestaurant } from '../features/restaurantSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IDish, removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XCircleIcon } from 'react-native-heroicons/outline';
import { PrimaryColor } from '../constants/primaryColor';
import { urlFor } from '../sanity/sanity';
import { formatCurrency } from 'react-native-format-currency';

export default function BasketScreen() {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant)
    const items = useSelector(selectBasketItems)
    const basketTotal = useSelector(selectBasketTotal)
    const dispatch = useDispatch();

    const cachedDishes = useMemo(() => {
        const groupedItems = items.reduce<Record<string, IDish[]>>((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results
        }, {})
        return groupedItems;
    }, [items])


    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='flex-1 bg-gray-100'>
                <View className='p-5 border-b border-[#35b8b2] bg-white shadow-xs'>
                    <View>
                        <Text className='text-lg font-bold text-center'>Basket</Text>
                        <Text className='text-center text-gray-400'>{restaurant?.name}</Text>
                    </View>
                    <TouchableOpacity
                        className='rounded-full bg-gray-100 absolute top-3 right-3'
                        onPress={navigation.goBack}>
                        <XCircleIcon color={PrimaryColor} height={50} width={50} />
                    </TouchableOpacity>
                </View>
                <View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-5'>
                    <Image
                        className='h-7 w-7 bg-gray-100 p-4 rounded-full'
                        source={{
                            uri: restaurant?.imageUrl
                        }} />
                    <Text className='flex-1 '>Deliver in 30 - 45 min </Text>
                    <TouchableOpacity>
                        <Text className='text-[#35b8b2]'>Change</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView className='divide-y divide-gray-200'>
                    {Object.entries(cachedDishes).map(([key, items]) => {
                        const [price] = formatCurrency({ amount: Number(items[0].price.toPrecision(4)), code: "USD" });

                        return (<View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
                            <Text className=''>{items.length}X</Text>
                            <Image source={{
                                uri: urlFor(items[0]!.image).url()
                            }}
                                className="w-12 h-12 rounded-full"
                            />
                            <Text className='flex-1'>{items[0]?.name}</Text>
                            <Text className='text-gray-400'>{price}</Text>
                            <TouchableOpacity >
                                <Text
                                    onPress={() => dispatch(removeFromBasket({ id: key }))}
                                    className='text-[#35b8b2]'>
                                    Remove
                                </Text>
                            </TouchableOpacity>
                        </View>
                        )
                    })}
                </ScrollView>
                <View className='p-5 bg-white mt-5 space-y-4'>
                    <View className='flex-row justify-between '>
                        <Text className='text-gray-400'>Subtotal</Text>
                        <Text className='text-gray-400'>{formatCurrency({ amount: Number(basketTotal.toPrecision(4)), code: "USD" })[0]}</Text>
                    </View>
                    <View className='flex-row justify-between '>
                        <Text className='text-gray-400'>Delivery fee</Text>
                        <Text className='text-gray-400'>{formatCurrency({ amount: Number((basketTotal / 5).toPrecision(4)), code: "USD" })[0]}</Text>
                    </View>


                    <View className='flex-row justify-between '>
                        <Text className='font-extrabold'>Order total</Text>
                        <Text className='font-extrabold'>{formatCurrency({ amount: Number((basketTotal * 1.2).toPrecision(4)), code: "USD" })[0]}</Text>
                    </View>
                    <TouchableOpacity
                        className='rounded-lg bg-[#35b8b2] p-4'>
                        <Text className='text-center text-white text-xl font-bold'>Place order</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}