import { Router } from "express";
import { authorization } from "../middleware/authHandler";
import { jwtChecker } from "../utils/jwtChecker";
import {register,verify_otp,userLogin,verifyLoginOtp,resendOtp} from '../controller/userController/authController'
import { fetchServices } from "../controller/adminController/serviceController";
import { addBooking, viewBookings,cancelBooking ,payBooking,paymentSuccess} from "../controller/userController/bookingController";
import { updateProfile,updateProfileImage } from "../controller/userController/profileController";
import { fetchExpertsbyService,fetchTrendingService } from "../controller/userController/serviceController";
import { addReview,fetchSingleReview,updateReview,deleteReview,fetchReviewsByService } from "../controller/userController/reviewController";
import uploadCloudinary from "../utils/multer";
import {validateBody } from "../utils/validateBody";
import {userLoginMobileAndOtpSchema, userLoginMobileSchema, userSchema, userVerifyOtpSchema } from "../middleware/yupSchema";
import { validate_id } from "../utils/validateId";
const router=Router()

router.get('/jwt',jwtChecker)
router.post('/register',validateBody(userSchema), register)
router.post('/verify-otp',validateBody(userVerifyOtpSchema), verify_otp)
router.post('/resend-otp',validateBody(userLoginMobileSchema), resendOtp)
router.post('/login',validateBody(userLoginMobileSchema) ,userLogin)
router.post('/verify-login-otp',validateBody(userLoginMobileAndOtpSchema), verifyLoginOtp)
router.get('/services',fetchServices)
router.get('/services/:id&:name',fetchExpertsbyService)
router.get('/trending-services',fetchTrendingService)
router.get('/reviews',fetchReviewsByService)
router.use(authorization)
//profile
router.route('/profile/:id').patch(validate_id, updateProfile).put(uploadCloudinary.single('file'),validate_id,updateProfileImage)

//booking
router.post('/bookings',addBooking) 
router.route('/bookings/:id').get(validate_id,viewBookings).patch(validate_id,cancelBooking)

//payment
router.post('/payment',payBooking)
router.post('/payment/success',paymentSuccess)

//review
router.post('/reviews',addReview)
router.route('/reviews/:id').get(validate_id,fetchSingleReview).patch(validate_id,updateReview).delete(validate_id,deleteReview)

export default router

