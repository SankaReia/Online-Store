import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { PictureI } from "../utils/models";
import { BASE_URL } from "../http";

export const pictureAPI = createApi({
  reducerPath: "pictureAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Picture"],

  endpoints: (build) => ({
    fetchAllPictures: build.query<PictureI[], any>({
      query: () => ({
        url: "picture/",
      }),
      providesTags: (result) => ["Picture"],
    }),

    fetchOnePicture: build.query<PictureI, string>({
      query: (id: string) => ({
        url: "picture/" + id,
      }),
      providesTags: (result) => ["Picture"],
    }),

    createPicture: build.mutation<PictureI, FormData>({
      query: (picture) => ({
        url: "picture",
        method: "POST",
        body: picture,
      }),
      invalidatesTags: ["Picture"],
    }),

    updatePicture: build.mutation<PictureI, FormData>({
      query: (picture) => ({
        url: "picture/update/",
        method: "PUT",
        body: picture,
      }),
      invalidatesTags: ["Picture"],
    }),

    deletePicture: build.mutation<PictureI, number>({
      query: (id) => ({
        url: `picture/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Picture"],
    }),
  }),
});
