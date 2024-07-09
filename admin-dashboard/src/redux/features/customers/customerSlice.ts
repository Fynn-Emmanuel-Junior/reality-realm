import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    customers: [],
    customer: {}
};

const customerSlice = createSlice({
    name: 'customerSlice',
    initialState,
    reducers: {
        getCustomersInfo: (state, action) => {
            state.customers = action.payload;
        },
        getCustomerInfo: (state,action) => {
            state.customer = action.payload;
        },
        removeCustomer: (state, action) => {
            state.customers = state.customers.filter((customer: any) => customer._id !== action.payload);
        },
        removeCustomers: (state) => {
            state.customers = [];
        }
    }
});

export const {getCustomersInfo,removeCustomer,removeCustomers,getCustomerInfo} = customerSlice.actions;

export default customerSlice.reducer;
