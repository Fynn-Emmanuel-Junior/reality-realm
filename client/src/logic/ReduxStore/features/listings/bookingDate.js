import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    bookingDate: ''
}

const bookingDateSlice = createSlice({
    name: 'bookingDate',
    initialState,
    reducers: {
        setBookingDate: (state, action) => {
            state.bookingDate = action.payload;
        }
    }
})

export const {setBookingDate} = bookingDateSlice.actions;
export default bookingDateSlice.reducer