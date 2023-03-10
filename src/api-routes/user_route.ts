import { Router } from "express";
import {register,verify_otp} from '../controller/user_controller/userController'
const route=Router()

route.post('/register',register)
route.post('/verify_otp',verify_otp)

export default route