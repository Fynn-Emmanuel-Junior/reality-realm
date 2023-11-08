import ListingModel from "../models/ListingModel.js"
 
const createListings = async (req,res) => {
    try {
        const listing = await ListingModel.create(req.body)
        res.status(201).json(listing)

    } catch(err) {
        res.status(400).json({message: 'cannot create listing'})
    }
}

export {
    createListings
}