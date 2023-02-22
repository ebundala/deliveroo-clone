import { useEffect, useMemo, useState } from 'react';
import sanityClient from "../sanity/sanity";
import restaurantByPromotion from '../query/restaurantByPromotion';
import { SanityImageAssetDocument } from '@sanity/client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
type TFeaturedItem = {
    _id:string
    name:string
    description:string
    restaurants:TRestaurant[]
}
type TRestaurant = {   
    _id:string
    name:string
    description:string
    address:string
    rating:number
    location:{
    lat:number
    lng:number}
    category: string;
    image: SanityImageAssetDocument;
    
}
export function useFeaturedRestaurants(id:string) {
    const [featured, setRestaurant] = useState<TFeaturedItem>();
    
    useEffect(() => {
        sanityClient.fetch(restaurantByPromotion,{id}).then((v) => setRestaurant(v[0]))
    }, []);
    return featured;
}
