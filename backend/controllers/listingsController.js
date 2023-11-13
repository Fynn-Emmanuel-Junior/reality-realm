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
    
    try {
        const listings = await ListingModel.findById({ userRef:req.user._id })
        console.log(listings)
        re.status(200).json(listings)
    } catch(err) {
        res.status(400).json({message: `cannot get listings:${err.message} `})
    }
}

export {
    createListings,
    getAllListings
}