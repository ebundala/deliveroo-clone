import { useEffect, useState } from 'react';
import sanityClient from "../sanity/sanity";
import promotions from "../query/promotions";
type TFeaturedCategory = {
    _id:string
    name:string
    description:string
}
export function useFeaturedCategories() {
    const [featuredCategories, setFeatureCategories] = useState<TFeaturedCategory[]>([]);
    useEffect(() => {
        sanityClient.fetch(promotions).then((v) => setFeatureCategories(v))
    }, []);
    return featuredCategories;
}
