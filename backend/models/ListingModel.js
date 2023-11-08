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
    regularPrice: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: String,
        required: true
    },
    bedrooms:{
        type: String,
        required: true
    },
    furnished: {
        type: Boolean,
        required: true
    },
    parking: {
        type: Boolean,
        required: true
    },
    typeOfPlace: {
        type: String,
        required: true
    },
    Offer: {
        type: Boolean,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    userRef: {
        type: String,
        required: true
    }

}, {timestamp: true})

const ListingModel = mongoose.model('ListingModel',listingSchema);

export default ListingModel;