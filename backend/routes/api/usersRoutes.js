import  express  from "express";
import {
    register,
    auth,
    google,
    update,
    deleteUser,
    signout,
    getUser
} from '../../controllers/userController.js'
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router()


router.post('/register',register)
router.post('/auth',auth)
router.post('/google',google)
router.put('/update',authMiddleware, update)
router.delete('/delete',authMiddleware,deleteUser)
router.get('/signout',signout)
router.get('/:id',authMiddleware,getUser)



export default router