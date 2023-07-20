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

    // addToBasket: build.mutation<PictureI, FormData>({
    //   query: (picture) => ({
    //     url: "picture",
    //     method: "POST",
    //     body: picture,
    //   }),
    //   invalidatesTags: ["Basket"],
    // }),

    // deleteFromBasket: build.mutation<PictureI, number>({
    //   query: (id) => ({
    //     url: `picture/delete/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Basket"],
    // }),
  }),
});
