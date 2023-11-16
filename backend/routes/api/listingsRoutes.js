import express from 'express'
import { authMiddleware } from '../../middlewares/authMiddleware.js'
import {
    createListings,
    getAllListings,
    deletelisting,
    updatelisting,
    getListing
} from '../../controllers/listingsController.js'

const router = express.Router()

router.get('/get/:id',authMiddleware,getAllListings)
router.post('/create',authMiddleware,createListings)
router.delete('/delete/:id',authMiddleware,deletelisting)
router.put('/update/:id',authMiddleware,updatelisting)
router.get('/getlisting/:id',getListing)


export default router