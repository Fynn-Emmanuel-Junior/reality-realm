import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    details: {
        type: String
    },
    typeOfPlace: {
        type: String,
        required: true
    },
    furnished: {
        type: Boolean,
    },
    parking: {
        type: Boolean,
    },
    offer: {
        type: Boolean,  
    },
    bathrooms: {
        type: String,  
    },
    bedrooms:{
        type: String,  
    },
    regularPrice: {
        type: Number,
    },
    discountPrice: {
        type: Number,
    },
    imageurls: {
        type: Array,
        required: true
    },
    userRef: {
        type: String,
    }

}, {timestamps: true})

const ListingModel = mongoose.model('Listing',listingSchema);

export default ListingModel;