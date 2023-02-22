import React from 'react'
import { ScrollView } from 'react-native'
import { useCategories } from '../hooks/useCategories';
import { urlFor } from '../sanity/sanity';
import { CategoryCard } from './CategoryCard';


export default function Categories() {
  const categories = useCategories();
  return (
    <ScrollView 
    contentContainerStyle={{
     // paddingHorizontal:15,
      paddingTop:10,
      paddingBottom:10
    }}
    horizontal>
      {categories.map((v)=>
     <CategoryCard 
     key={v._id} 
     imageUrl={urlFor(v.image).url()} 
     name={v.name}/>
     )}
       </ScrollView>
  );
}

