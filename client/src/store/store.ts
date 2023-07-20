import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import basketReducer from "./slices/basketSlice";
import { pictureAPI } from "../services/PictureService";
import { basketAPI } from "../services/BasketService";

const rootReducer = combineReducers({
  userReducer,
  basketReducer,
  [pictureAPI.reducerPath]: pictureAPI.reducer,
  [basketAPI.reducerPath]: basketAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        pictureAPI.middleware,
        basketAPI.middleware
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppSore = ReturnType<typeof setupStore>;
export type AppDispatch = AppSore["dispatch"];
