import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { PictureI } from '../../utils/models'



const initialState: PictureI[]  = []

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket (state, action: PayloadAction<PictureI[]>) {
            state = action.payload
            return state
        },
    }
})

export const {setBasket} = basketSlice.actions
export default basketSlice.reducer