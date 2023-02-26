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
        <SafeAreaView className='px-3' style={{marginTop:(StatusBar.currentHeight??0)+10}}>
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
                <View className='flex-row space-x-1 bg-gray-200 rounded-3xl  flex-1 p-2' >
                   
                 
                      <MagnifyingGlassIcon className='w-1/6'width={28} height={28} color={PrimaryColor}  /> 
                  
                     
                    <TextInput  onChangeText={(v)=>{}} 
                   className='w-10/12'
                     placeholder='Restaurants & Cuisine'
                     
                     />
                   
                </View>
                <AdjustmentsHorizontalIcon size={28} color={PrimaryColor}/>
            </View>
            <ScrollView contentContainerStyle={
                {
               paddingBottom:120
                }

            }
            showsVerticalScrollIndicator={false} 
            >
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