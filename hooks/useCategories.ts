import { useEffect, useState } from 'react';
import sanityClient from "../sanity/sanity";
import category from '../query/category';
import { SanityImageAssetDocument } from '@sanity/client';
type TCategory = {
    _id:string
    name:string
    image:SanityImageAssetDocument
}
export function useCategories() {
    const [categories, setCategories] = useState<TCategory[]>([]);
    useEffect(() => {
        sanityClient.fetch(category).then((v) => setCategories(v))
    }, []);
    return categories;
}