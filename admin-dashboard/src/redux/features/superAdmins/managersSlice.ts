import { createSlice } from '@reduxjs/toolkit';

interface props {
    managers: any;
}

const initialState: props = {
    managers: []
};

const managersSlice = createSlice({
    name: 'managersSlice',
    initialState,
    reducers: {
        setManagers: (state, action) => {
            state.managers = action.payload;
        },
        removeManagerById: (state, action) => {
            state.managers = state.managers.filter((manager: any) => manager._id !== action.payload);
        }
    }
});

export const { setManagers, removeManagerById } = managersSlice.actions;

export default managersSlice.reducer;
