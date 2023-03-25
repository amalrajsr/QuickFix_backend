import { Router } from "express";
import {register,verify_otp,user_login,verify_login_otp,resend_otp,userJwtChecker} from '../controller/user_controller/authController'
import { userAuthorization } from "../middleware/authHandler";
const router=Router()

router.get('/jwt',userJwtChecker)
router.post('/register',register)
router.post('/verify-otp',verify_otp)
router.get('/resend-otp',resend_otp)
router.post('/login',user_login)
router.post('/verify-login-otp',verify_login_otp)
// router.use(Authorization)
export default router
