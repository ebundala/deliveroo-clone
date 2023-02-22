import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { SanityImageAssetDocument } from '@sanity/client'
import { RootState } from '../store/store'
export interface IRestaurant{
    id:string
    imageUrl:string
    name:string
    rating:number
    address:string
    description:string
    category:string
    dishes:{_id:string,name:string,description:string,image:SanityImageAssetDocument,price:number}[]
    lng:number
    lon:number
}
export interface RestaurantState {
    restaurant: IRestaurant | null
  }

  const initialState: RestaurantState = {
    restaurant: null,
  }
  
  export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
      setRestaurant: (state,action:PayloadAction<IRestaurant>) => {
        
        state.restaurant = action.payload
      },
      
      
    },
  })

  // Action creators are generated for each case reducer function
export const { setRestaurant } = restaurantSlice.actions
export const selectRestaurant = (state:RootState)=>state.restaurant.restaurant;

export default restaurantSlice.reducer