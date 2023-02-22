import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { IDish, selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { formatCurrency } from 'react-native-format-currency';
import { PrimaryColor } from '../constants/primaryColor';

export default function BasketIcon() {
    const items = useSelector(selectBasketItems);
    const navigation:NavigationProp<{basket:IDish[]}> = useNavigation();
    const basketTotal = useSelector(selectBasketTotal)
    const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] = formatCurrency({ amount: Number(basketTotal.toPrecision(4)), code: "USD" });
  if(items.length==0) return null;
  return (
    <View className='absolute bottom-6 w-full z-30'>
        <TouchableOpacity 
        onPress={()=>{
            navigation.navigate("basket",items)
        }}
        className="mx-5 bg-[#35b8b2] p-4 flex-row items-center space-x-2 rounded-lg">
      <Text className='text-white font-extrabold text-lg bg-[#089790] py-1 px-3 rounded-md'>{items.length}</Text>
      <Text className='text-white flex-1 font-extrabold text-lg text-center'>View Basket</Text>
      <Text className='text-lg text-white font-extrabold'>{valueFormattedWithSymbol}</Text>
      </TouchableOpacity>
    </View>
  )
}