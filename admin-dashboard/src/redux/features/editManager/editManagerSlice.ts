import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    update: false
};

const editManagerSlice = createSlice({
    name: 'update manager state',
    initialState,
    reducers: {
        setState: (state,action) => {
            state.update = action.payload;
        }
    }
});

export const {setState} = editManagerSlice.actions;

export default editManagerSlice.reducer;
