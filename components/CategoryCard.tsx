import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';

export type TCategoryCardProps={imageUrl:string,name:string}

export function CategoryCard({ imageUrl, name }: TCategoryCardProps) {
  return (
    <TouchableOpacity className='relative mx-1'>
      <Image
        source={{ uri: imageUrl }}
        className="h-20 w-20 rounded " />
      <View className='flex-row items-center justify-center absolute bottom-1 left-0 right-0'>
      <Text  className='font-bold text-sm text-white  '>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}
