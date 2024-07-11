import  express  from "express";
import {
    register,
    auth,
    google,
    update,
    deleteUser,
    signout,
    getUser,
    sendOtpController,
    verifyOtpController,
    refresh,
    getUsers
} from '../../controllers/userController.js';
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();


router.post('/register',register);
router.get('/get-users',getUsers);
router.post('/send',sendOtpController);
router.post('/verify',verifyOtpController);
router.post('/auth',auth);
router.get('/refresh',refresh);
router.post('/google',google);
router.put('/update',authMiddleware, update);
router.delete('/delete',authMiddleware,deleteUser);
router.post('/signout',authMiddleware,signout);
router.get('/:id',authMiddleware,getUser);


export default router;