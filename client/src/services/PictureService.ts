import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { PictureI } from '../utils/models'

export const pictureAPI = createApi({
    reducerPath: 'PictureAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_APP_API_URL}`}),
    endpoints: (build) => ({

        fetchAllPictures: build.query<PictureI[], any>({
            query: ()=>({
                url: 'api/picture'
            })
        }),

        fetchOnePicture: build.query<PictureI, string>({
            query: (id: string)=>({
                url: 'api/picture/' + id,
            })
        })
    })
})