import {PayloadAction, createSlice} from '@reduxjs/toolkit'

export interface UserI {
    id: number;
    email: string;
    role: "USER" | 'ADMIN';
}

const initialState: UserI  = {
    id: 0,
    email: '',
    role: 'USER',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser (state, action: PayloadAction<UserI>) {
            state.email = action.payload.email
            state.id = action.payload.id
            state.role = action.payload.role
        },
        removeUser (state) {
            state.email = ''
            state.id= 0
            state.role = 'USER'
        }
    }
})

export const {setUser, removeUser} = userSlice.actions
export default userSlice.reducer