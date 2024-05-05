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

export const {setImages} = ImageSlice.actions

export const selectImages = (state) => state.images.images

export default ImageSlice.reducer