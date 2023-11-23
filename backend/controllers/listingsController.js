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

const updatelisting = async (req,res) => {
    const listing = await ListingModel.findById(req.params.id)
    
    if(listing) {
        try {
            const updateListing = await ListingModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new: true}
            )
            res.status(200).json(updateListing)
        } catch (err) {
            res.status(400).json({message:`Error updating listing\n ${err.message}`})
        }
    } else {
        res.status(404).json('No listing found')
    }
}

const deletelisting = async(req,res) => {
    const listing = await ListingModel.findById(req.params.id)
    
    if(!listing) return res.status(404).json('No listing found')

    try {
        await ListingModel.deleteOne({_id: listing._id})
        res.status(200).json('Listing has been deleted')
    } catch(err) {
        res.status(400).json({message: `cannot delete listing\n${err.message}`})
    }
}

const getListing = async(req,res) => {
    try {
        const listing = await ListingModel.findById(req.params.id) 

        if(!listing) return res.status(404).json('No listing found')

        res.status(200).json(listing) 
        
    } catch(err) {
        res.status(400).json({message: `No listing found\n${err.message}`})
    }
}

const getListings = async (req,res) => {
    try {
        const limit = parseInt(req.query.limit) || 9
        const startIndex = parseInt(req.query.startIndex) || 0

        let offer = req.query.offer
        let furnished = req.query. furnished
        let parking = req.query. parking
        let type = req.query. type

        const searchTerm = req.query.searchTerm || ''
        const  sort = req.query.sort || 'createdAt'
        const order = req.query.order || 'desc'


        // if(offer === undefined || offer ==='false') { 
        //     offer = {$in: [false,true]}
        // }

        // if(furnished === undefined || furnished === 'false') {
        //     furnished = {$in: [false,true]}
        // }

        // if(parking === undefined || furnished === 'false') {
        //     parking = {$in: [false,true]}
        // }

        // if(type === undefined || type === 'all') {
        //     type = {$in: ['sale','rent']}
        // }


        const listings = await ListingModel.find({
            name: { $regex: searchTerm,$options: 'i'},
            offer,
            furnished,
            parking,
            type
        }).sort(
            {[sort]: order}
        ).limit(limit).skip(startIndex)

        return res.status(200).json(listings)

    } catch(err) {
        res.status(404).json('No listings found') 
    }
}

export {
    createListings,
    getAllListings,
    deletelisting,
    updatelisting,
    getListing,
    getListings
}