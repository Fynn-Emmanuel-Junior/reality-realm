import ListingModel from "../models/ListingModel.js"
 
const createListings = async (req,res) => {
    try {
        const listing = await ListingModel.create({
            name: req.body.name,
            description: req.body.description,
            address:req.body.address,
            regularPrice: req.body.regularPrice,
            discountprice: req.body.discountPrice,
            bedrooms: req.bopdy.bedrooms,
            bathrooms: req.bopdy.bathrooms,
            parking: req.body.parking,
            furnished: req.body.furnished,
            typeOfPlace: req.body.sell || req.body.rent,
            offer: req.bopdy.offer,
            images: req.body.imageurl
            
        })
        res.status(201).json(listing)

    } catch(err) {
        res.status(400).json({message: 'cannot create listing'})
    }
}

export {
    createListings
}