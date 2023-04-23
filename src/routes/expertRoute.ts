import { Router } from "express";
import { jwtChecker } from "../utils/jwtChecker";
import  {expertLogin, forgotPassword, forgotPasswordOtpVerify,resendOtp,forgotPasswordReset} from '../controller/expertController/authController'
import { updateExpertProfile,resetPassword } from "../controller/expertController/profileController";
import { viewWorks,updateWorkPayment,updatePaymentStatus } from "../controller/expertController/workController";
import { authorization } from "../middleware/authHandler";

const router=Router()
router.get('/jwt',jwtChecker)
router.post('/login',expertLogin)

//forgot password 
router.post('/forgot-password',forgotPassword)
router.post('/forgot-password-verify-otp',forgotPasswordOtpVerify)
router.post('/resend-otp',resendOtp)
router.put('/reset-password/:id',forgotPasswordReset)

router.use(authorization) // routes below needs authourization to access
router.patch('/profile/:id',updateExpertProfile)
router.route('/works/:id').get(viewWorks).patch(updateWorkPayment).put(updatePaymentStatus)
router.patch('/reset-password/:id',resetPassword)

export default router