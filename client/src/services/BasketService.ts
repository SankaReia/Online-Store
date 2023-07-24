import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BasketI } from "../utils/models";
import { BASE_URL } from "../http";

export const basketAPI = createApi({
  reducerPath: "basketAPI",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Basket"],

  endpoints: (build) => ({
    fetchBasket: build.query<BasketI[], number>({
      query: (person_id) => ({
        url: `basket/${person_id}`,
      }),
      providesTags: (result) => ["Basket"],
    }),

    addToBasket: build.mutation<BasketI, BasketI>({
      query: (basket) => ({
        url: "basket",
        method: "POST",
        body: basket,
      }),
      invalidatesTags: ["Basket"],
    }),

    deleteFromBasket: build.mutation<BasketI, number>({
      query: (picture_id) => ({
        url: `basket/delete/${picture_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Basket"],
    }),

    updateBasket: build.mutation<BasketI, BasketI>({
      query: (basket) => ({
        url: "basket/update",
        method: "PUT",
        body: basket,
      }),
      invalidatesTags: ["Basket"],
    }),
  }),
});
