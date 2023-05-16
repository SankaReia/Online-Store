import {configureStore, combineReducers} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'


const rootReducer = combineReducers({
    userReducer,

})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    }) 
}

export type RootState = ReturnType<typeof rootReducer>
export type AppSore = ReturnType<typeof setupStore>
export type AppDispatch = AppSore['dispatch']