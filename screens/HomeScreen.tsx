import React from 'react';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, ScrollView, StatusBar, Text, TextInput, View } from 'react-native';
import { ChevronDownIcon, UserIcon,MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from "react-native-heroicons/outline"
import { PrimaryColor } from '../constants/primaryColor';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import { useFeaturedCategories } from '../hooks/useFeaturedCategories';

export function HomeScreen() {
   
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    }, []);
   const featuredCategories = useFeaturedCategories();
   
    return (
        <SafeAreaView className='px-3' style={{marginTop:StatusBar.currentHeight}}>
            <View className='flex-row  items-center space-x-2' >
                <Image
                    source={require("../assets/rider.png")}
                    className="w-12 h-12 bg-gray-300  rounded-full"
                />
                <View className='flex-col justify-center flex-1'>
                    <Text  className="font-bold text-gray-400 text-sm leading-4">
                        Deliver now
                    </Text>
                    <View className='flex-row justify-start space-x-1 items-center'>
                        <Text className="font-bold text-lg leading-5" >
                            Current location
                        </Text>
                        <ChevronDownIcon size={20} color={PrimaryColor} />
                    </View>
                </View>
                <UserIcon size={28} color={PrimaryColor}/>

            </View>
            <View className='flex-row pt-3 pb-1 space-x-2 items-center'>
                <View className='flax-row space-x-1 bg-gray-200 rounded-3xl p-2 flex-1'>
                    <MagnifyingGlassIcon  color={PrimaryColor}/>
                    <TextInput className='flex-1' placeholder='Restaurants & Cuisine'  keyboardType='default'/>
                </View>
                <AdjustmentsHorizontalIcon size={28} color={PrimaryColor}/>
            </View>
            <ScrollView contentContainerStyle={
                {
               paddingBottom:120
                }
            } >
                {/* categories */}
                <Categories/>
                {/* featured */}
                {featuredCategories?.map((v)=>
                <FeaturedRow key={v._id} title={v.name} id={v._id} description={v.description}/>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}