import { Router } from "express";
import {register,verify_otp,user_login,verify_login_otp,resend_otp} from '../controller/userController/authController'
import { jwtChecker } from "../utils/jwtChecker";
import { fetchServices } from "../controller/adminController/serviceController";
import { userAuthorization } from "../middleware/authHandler";
import { addBooking, viewBookings,cancelBooking ,payBooking,paymentSuccess} from "../controller/userController/bookingController";
import { updateProfile,updateProfileImage } from "../controller/userController/profileController";
import { fetchExpertsbyService } from "../controller/userController/serviceController";
import uploadCloudinary from "../utils/multer";

const router=Router()

router.get('/jwt',jwtChecker)
router.post('/register',register)
router.post('/verify-otp',verify_otp)
router.get('/resend-otp',resend_otp)
router.post('/login',user_login)
router.post('/verify-login-otp',verify_login_otp)
router.get('/services',fetchServices)
router.get('/services/:id&:name',fetchExpertsbyService)

router.use(userAuthorization)
//profile
router.route('/profile/:id').patch(updateProfile).put(uploadCloudinary.single('file'),updateProfileImage)

//booking
router.post('/bookings',addBooking)
router.route('/bookings/:id').get(viewBookings).patch(cancelBooking)

//payment
router.post('/payment',payBooking)
router.post('/payment/success',paymentSuccess)


export default router
