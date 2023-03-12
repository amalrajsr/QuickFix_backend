import { Router } from "express";
import {register,verify_otp,user_login,verify_login_otp} from '../controller/user_controller/userController'
import { userAuthorization } from "../middleware/authHandler";
const route=Router()

route.post('/register',register)
route.post('/verify_otp',verify_otp)
route.post('/login',userAuthorization,user_login)
route.post('/verify_login_otp',verify_login_otp)
route.get('/test',userAuthorization)
export default route