import ListingModel from "../models/ListingModel.js"
 
const createListings = async (req,res) => {
    try {
        const listing = await ListingModel.create(req.body)
        res.status(201).json(listing) 

    } catch(err) {
        res.status(400).json({message: `cannot create listing: ${err.message}`})
    }
}

const getAllListings = async(req,res) => {
    if(req.params.id == req.user._id) {
        try {
            const listings = await ListingModel.find({userRef: req.params.id})
            res.status(200).json(listings)
        } catch(err) {
            res.status(401).json({message: `cannot get listings:${err.message}`})
        }

    } else {
        res.status(400).json({message: 'Bad request on listings'})
    }
}

export {
    createListings,
    getAllListings
}