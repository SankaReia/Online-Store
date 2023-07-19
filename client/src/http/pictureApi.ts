import { $authHost, $host } from "./index";



export const createPicture = async (picture: FormData) => {
    try {
        const {data} = await $authHost.post('api/picture', picture )
        return data
    } catch (e) {
        console.log(e)
    }

}

// export const fetchPictures = async () => {
//     try {
//         const {data} = await $host.get('api/picture' )
//         return data
//     }catch (e){
//         console.log(e)
//     }
// }

// export const fetchOnePicture = async (id: string) => {
//     try {
//         const {data} = await $host.get('api/picture/' + id)
//         return data
//     }catch (e){
//         console.log(e)
//     }
// }



export const deletePicture = async (id: number) => {
    try {
        const {data} = await $authHost.delete(`api/picture/delete/${id}`)
        return data
    } catch (e) {
        console.log(e)
    }

}
