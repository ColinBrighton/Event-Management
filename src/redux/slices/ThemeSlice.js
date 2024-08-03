import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    theme: ''
}

const ThemeSlice = createSlice({
    name: 'ThemeSlice',
    initialState,
    reducers: {
        ToogleTheme: (state, action) => {
            state.theme = action.payload
        }
    }
})

export const { ToogleTheme } = ThemeSlice.actions
export default ThemeSlice.reducer