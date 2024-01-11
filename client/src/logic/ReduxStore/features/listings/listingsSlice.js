import { createSlice,createAsyncThunk} from '@reduxjs/toolkit'

const URL = 'http://localhost:3500/api/listings/get-all-listings'

const initialState = {
    listings: [],
    status: '',
    error: null
}

export const fetchListings = createAsyncThunk('fetchlistings', async() => {
    try {
        const response = await fetch(URL)
        return [...response.data]
    } catch(err) {
        return err.message
    }
})


const listingsSlice = createSlice({
    name: 'listings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchListings.pending,(state) => {
            state.status = 'pending'
        })

        builder.addCase(fetchListings.fulfilled , (state,action) => {
            state.status = 'sucessfull'
            state.listings = action.payload
        })

        builder.addCase(fetchListings.rejected, (state,action) => {
            state.status = 'rejected'
            state.error = action.error.message
        } )
    }
})

export const selectStatus = (state) => state.listings.status 
export const selectListings = (state) => state.listings.listings
export const selectError = (state) => state.listings.error

export default listingsSlice.reducer

