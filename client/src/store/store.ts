import {configureStore, combineReducers} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import pictureReducer from './slices/pictureSlice'


const rootReducer = combineReducers({
    userReducer,
    pictureReducer,

})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    }) 
}

export type RootState = ReturnType<typeof rootReducer>
export type AppSore = ReturnType<typeof setupStore>
export type AppDispatch = AppSore['dispatch']