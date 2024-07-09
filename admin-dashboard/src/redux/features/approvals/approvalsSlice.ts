import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    no_of_approvals: 0
};

const approvalsSlice = createSlice({
    name: 'approvals',
    initialState,
    reducers: {
        setApprovals: (state, action) => {
            state.no_of_approvals = action.payload;
        }
    }
});

export const { setApprovals } = approvalsSlice.actions;
export default approvalsSlice.reducer;