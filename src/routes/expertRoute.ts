import { Router } from "express";
import { jwtChecker } from "../utils/jwtChecker";
import  {expertLogin, forgotPassword, forgotPasswordOtpVerify,resendOtp,forgotPasswordReset} from '../controller/expertController/authController'
import { updateExpertProfile,resetPassword,profileDetails } from "../controller/expertController/profileController";
import { viewWorks,updateWorkPayment,updatePaymentStatus } from "../controller/expertController/workController";
import { authorization } from "../middleware/authHandler";
import { validateBody } from "../utils/validateBody";
import { expertForgotPassVerifyOtpSchema, expertForgotPasschema, expertSchema, forgotPasswordSchema, otpSchema, passwordSchema } from "../middleware/yupSchema";
import { validate_id } from "../utils/validateId";

const router=Router()
router.get('/jwt',jwtChecker)
router.post('/login',validateBody(expertSchema), expertLogin)

//forgot password 
router.post('/forgot-password',validateBody(expertForgotPasschema), forgotPassword)
router.post('/forgot-password-verify-otp',validateBody(expertForgotPassVerifyOtpSchema), forgotPasswordOtpVerify)
router.post('/resend-otp',validateBody(otpSchema), resendOtp)
router.put('/reset-password/:id',validate_id, validateBody(forgotPasswordSchema), forgotPasswordReset)

router.use(authorization) // routes below needs authourization to access
router.route('/profile/:id').patch(validate_id, updateExpertProfile).get(validate_id,profileDetails)
router.route('/works/:id').get(validate_id,viewWorks).patch(validate_id,updateWorkPayment).put(validate_id,updatePaymentStatus)
router.patch('/reset-password/:id',validate_id,validateBody(passwordSchema), resetPassword)

export default router
