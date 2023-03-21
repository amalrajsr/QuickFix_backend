import { Router } from "express";
import {register,verify_otp,user_login,verify_login_otp,resend_otp} from '../controller/user_controller/authController'
import { Authorization } from "../middleware/authHandler";
const route=Router()
route.post('/register',register)
route.post('/verify_otp',verify_otp)
route.get('/resend_otp',resend_otp)
route.post('/login',user_login)
route.post('/verify_login_otp',verify_login_otp)
export default route