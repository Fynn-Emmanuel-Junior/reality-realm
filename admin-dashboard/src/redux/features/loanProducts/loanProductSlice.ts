import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loan_products: [],
    loan_product: {}
};

const loanProductSlice = createSlice({
    name: 'loanProductSlice',
    initialState,
    reducers: {
        getLoanProducts: (state, action) => {
            state.loan_products = action.payload;
        },
        getloanProduct: (state,action) => {
            state.loan_product = action.payload;
        }
    }
});

export const {getLoanProducts,getloanProduct} = loanProductSlice.actions;

export default loanProductSlice.reducer;
