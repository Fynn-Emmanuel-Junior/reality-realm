import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    images: []
}

const ImageSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        setImages: (state,action) => {
            state.images = action.payload;
        }
    }
})

export default ImageSlice.reducer