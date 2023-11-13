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
    Offer: {
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

}, {timestamp: true})

const ListingModel = mongoose.model('Listing',listingSchema);

export default ListingModel;