import express from 'express'
import { authMiddleware } from '../../middlewares/authMiddleware.js'
import {
    createListings,
    getAllListings,
    deletelisting,
    updatelisting,
    getListing,
    getListings,
    getUserListings
} from '../../controllers/listingsController.js'

const router = express.Router()

router.post('/create',authMiddleware,createListings)
router.delete('/delete/:id',authMiddleware,deletelisting)
router.put('/update/:id',authMiddleware,updatelisting)
router.get('/getlisting/:id',getListing)
router.get('/get',getListings)
router.get('/get-all-listings',getAllListings)
router.get('get-user-listings/:id',authMiddleware,getUserListings)


export default router