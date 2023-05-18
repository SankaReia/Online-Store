import {PayloadAction, createSlice} from '@reduxjs/toolkit'


export interface PictureI {
    id: number;
    category: string;
    description: string;
    img: string;
    price: string;
    title: string;
  }

const initialState: PictureI[]  = []

export const pictureSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setPicture (state, action: PayloadAction<PictureI[]>) {
            state = action.payload
            return state
        },
    }
})

export const {setPicture} = pictureSlice.actions
export default pictureSlice.reducer