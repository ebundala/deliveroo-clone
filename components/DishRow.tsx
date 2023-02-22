import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { PrimaryColor } from '../constants/primaryColor';
import { formatCurrency } from 'react-native-format-currency';
import { urlFor } from '../sanity/sanity';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, BasketState, selectBasketItemWithId } from '../features/basketSlice';
import { SanityImageAssetDocument } from '@sanity/client';
import { RootState } from '../store/store';
export type TDishRowProps = {
    id: string
    name: string
    description: string
    price: number
    image: SanityImageAssetDocument
}
export function DishRow({ id, name, price, description, image }: TDishRowProps) {
    const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] = formatCurrency({ amount: Number(price.toPrecision(4)), code: "USD" });
    const [isPressed, setIsPressed] = useState(false);
    const dispatch = useDispatch();
    const items = useSelector((state: RootState) => selectBasketItemWithId(state, id) );

    const addItemToBasket = () => {
        dispatch(addToBasket({ id, name, price, description, image }));
        console.log(items);
    };
    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({ id }));
    };

   

    return (
        <>
            <TouchableOpacity onPress={() => {
                setIsPressed(!isPressed);
            }} className={`bg-white border p-4 border-gray-200 ${isPressed ? "border-b-0" : ""}`}>
                <View className='flex-row'>
                    <View className='flex-1 pr-2'>
                        <Text className='text-lg mb-1'>{name}</Text>
                        <Text className='text-gray-400'>{description}</Text>
                        <Text className='text-gray-400 mt-2'>
                            {valueFormattedWithSymbol}
                        </Text>
                    </View>

                    <View>
                        <Image source={{
                            uri: urlFor(image).url()
                        }}
                            className="h-20 w-20 bg-gray-300"
                            style={{
                                borderWidth: 1, borderColor: "#f3f3f4"
                            }} />
                    </View>
                </View>
            </TouchableOpacity>
            {isPressed && (
                <View className='bg-white px-4'>
                    <View className='flex-row items-center space-x-2 pb-3'>
                        <TouchableOpacity>
                            <MinusCircleIcon onPress={() => {
                                removeItemFromBasket();
                            }}
                                color={items.length > 0 ? PrimaryColor : "gray"} size={40} />
                        </TouchableOpacity>
                        <Text>{items.length}</Text>
                        <TouchableOpacity>
                            <PlusCircleIcon onPress={() => {
                                addItemToBasket();
                            }} color={PrimaryColor} size={40} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    );
}
