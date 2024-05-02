import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menu: null
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenu: (state,action) => {
            state.menu = action.payload;
        }
    }
})

export const setMenu = menuSlice.actions

export const selectMenu = (state) => state.menu.menu

export default menuSlice.reducer