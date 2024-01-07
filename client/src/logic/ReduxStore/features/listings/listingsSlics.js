import { createSlice,createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    listings: {},
    loading: false,
    error: null
}

export const fetchListings = createAsyncThunk('fetchlistings', async() => {
    try {
        const response = await fetch('/api/listings/get-all-listings')
        return [...response.data]
    } catch(err) {

    }
})


const listingsSlice = createSlice({
    name: 'listings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})

export const selectLoading = (state) => state.listings.loading 
export const selectError = (state) => state.listings.error

export default listingsSlice.reducer

