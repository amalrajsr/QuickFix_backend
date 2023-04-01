import { Router } from "express";
import {register,verify_otp,user_login,verify_login_otp,resend_otp} from '../controller/user_controller/authController'
import { jwtChecker } from "../utils/jwtChecker";
import { fetchServices } from "../controller/admin_controller/serviceController";
import { userAuthorization } from "../middleware/authHandler";
import { addBooking } from "../controller/user_controller/bookingController";
const router=Router()

router.get('/jwt',jwtChecker)
router.post('/register',register)
router.post('/verify-otp',verify_otp)
router.get('/resend-otp',resend_otp)
router.post('/login',user_login)
router.post('/verify-login-otp',verify_login_otp)
router.get('/services',fetchServices)

router.use(userAuthorization)

//booking

router.post('/bookings',addBooking)

export default router
