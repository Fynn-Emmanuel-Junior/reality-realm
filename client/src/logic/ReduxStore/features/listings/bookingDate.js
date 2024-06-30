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
export const selectBookingDate = (state) => state.bookingDate.bookingDate;

export default bookingDateSlice.reducer