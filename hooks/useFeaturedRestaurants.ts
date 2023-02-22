import { useEffect, useMemo, useState } from 'react';
import sanityClient from "../sanity/sanity";
import restaurantByPromotion from '../query/restaurantByPromotion';

export function useFeaturedRestaurants(id:string) {
    const [restaurant, setRestaurant] = useState();
    
    useEffect(() => {
        sanityClient.fetch(restaurantByPromotion,{id}).then((v) => setRestaurant(v))
    }, []);
    return restaurant;
}
