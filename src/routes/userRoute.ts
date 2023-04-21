import { Router } from "express";
import { userAuthorization } from "../middleware/authHandler";
import { jwtChecker } from "../utils/jwtChecker";
import {register,verify_otp,userLogin,verifyLoginOtp,resendOtp} from '../controller/userController/authController'
import { fetchServices } from "../controller/adminController/serviceController";
import { addBooking, viewBookings,cancelBooking ,payBooking,paymentSuccess} from "../controller/userController/bookingController";
import { updateProfile,updateProfileImage } from "../controller/userController/profileController";
import { fetchExpertsbyService,fetchTrendingService } from "../controller/userController/serviceController";
import { addReview,fetchSingleReview,updateReview,deleteReview,fetchReviewsByService } from "../controller/userController/reviewController";
import uploadCloudinary from "../utils/multer";

const router=Router()

router.get('/jwt',jwtChecker)
router.post('/register',register)
router.post('/verify-otp',verify_otp)
router.post('/resend-otp',resendOtp)
router.post('/login',userLogin)
router.post('/verify-login-otp',verifyLoginOtp)
router.get('/services',fetchServices)
router.get('/services/:id&:name',fetchExpertsbyService)
router.get('/trending-services',fetchTrendingService)

router.use(userAuthorization)
//profile
router.route('/profile/:id').patch(updateProfile).put(uploadCloudinary.single('file'),updateProfileImage)

//booking
router.post('/bookings',addBooking)
router.route('/bookings/:id').get(viewBookings).patch(cancelBooking)

//payment
router.post('/payment',payBooking)
router.post('/payment/success',paymentSuccess)

//review
router.route('/reviews').post(addReview).get(fetchReviewsByService)
router.route('/reviews/:id').get(fetchSingleReview).patch(updateReview).delete(deleteReview)

export default router

