import React from 'react'
import { View, Text, ScrollView} from 'react-native'
import { ArrowRightIcon } from 'react-native-heroicons/solid'

import { PrimaryColor } from '../constants/primaryColor'
import { useFeaturedRestaurants } from '../hooks/useRestaurantByCategory'
import { urlFor } from '../sanity/sanity'
import { RestaurantCard, TRestaurantCardProps } from './RestaurantCard'

type TFeaturedRawProps = {
    id:string
    title:string,
    description:string
}

export default function FeaturedRow({id,title,description}:TFeaturedRawProps) {
  const featured = useFeaturedRestaurants(id); 
    return (
    <View>
        <View className='flex-row mt-4 items-center justify-between'>
            <Text className='font-bold text-lg'>{title}</Text>
            <ArrowRightIcon  color={PrimaryColor}/>
        </View>
        <Text className='text-xs text-gray-400'>{description}</Text>
        <ScrollView 
        contentContainerStyle={
            {
               // paddingHorizontal:15,

            }
        }
        showsHorizontalScrollIndicator={false}
        horizontal 
        className='pt-4'
        >
         {featured&&featured?.restaurants?.map((v)=>
         <RestaurantCard key={v._id} {...{ id:v._id,
         name:v.name,
        
         rating:v.rating,
         address:v.address,
         description:v.description,
         category:v.category,
         dishes:[],
         lng:v.location.lat,lon:v.location.lng,
         imageUrl:urlFor(v.image).url()}}></RestaurantCard>
         )}
        
        </ScrollView>
    </View>
  )
}



