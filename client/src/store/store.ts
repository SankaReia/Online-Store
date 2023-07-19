import {configureStore, combineReducers, getDefaultMiddleware} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import basketReducer from './slices/basketSlice'
import { pictureAPI } from '../services/PictureService'



const rootReducer = combineReducers({
    userReducer,
    basketReducer,
    [pictureAPI.reducerPath]: pictureAPI.reducer

})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat(pictureAPI.middleware)
    }) 
}

export type RootState = ReturnType<typeof rootReducer>
export type AppSore = ReturnType<typeof setupStore>
export type AppDispatch = AppSore['dispatch']