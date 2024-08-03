import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    role: null
}

const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user
            state.role = action.payload.role
        }
    }
})

export const { setUser } = AuthSlice.actions
export default AuthSlice.reducer