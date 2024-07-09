import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    disbursements: [],
};

const disbursementSlice = createSlice({
    name: 'disbursements',
    initialState,
    reducers: {
        getDisbursements: (state, action) => {
            state.disbursements = action.payload;
        }
    }
});

export const {getDisbursements} = disbursementSlice.actions;

export default disbursementSlice.reducer;
