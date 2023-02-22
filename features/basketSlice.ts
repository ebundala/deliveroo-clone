import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { SanityImageAssetDocument } from '@sanity/client'
import { RootState } from '../store/store'
export interface IDish{
    id: string
    name: string
    description: string
    price: number
    image: SanityImageAssetDocument
}
export interface BasketState {
    items: IDish[]
  }

  const initialState: BasketState = {
    items: [],
  }
  
  export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
      
      addToBasket: (state,action:PayloadAction<IDish>) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.items = [...state.items,action.payload]
      },
      removeFromBasket: (state,action:PayloadAction<Pick<IDish,"id">>) => {
       const i = state.items.findIndex((v)=>action.payload.id === v.id);
       let newBasket = [...state.items];
       if(i>=0){
        newBasket.splice(i,1);
       }
       else{
        console.warn("No item found")
       }
        state.items = newBasket;
      },
      
    },
  })

  // Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions
export const selectBasketItems = (state:RootState)=>state.basket.items;
export const selectBasketItemWithId = (state:RootState,id:string)=>state.basket.items.filter((v)=>v.id === id);
export const selectBasketTotal = (state:RootState)=>state.basket.items.reduce((total,item)=>total+=item.price,0);

export default basketSlice.reducer