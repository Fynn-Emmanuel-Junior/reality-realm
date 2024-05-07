import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listing: {}
}

const listingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {
        setListing: (state,action) => {
            state.listing = action.payload;
        }
    }
})

export const {setListing} = listingSlice.actions

export const selectListing = (state) => state.listing.listing

export default listingSlice.reducer