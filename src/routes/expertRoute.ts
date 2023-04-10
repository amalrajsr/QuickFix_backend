import { Router } from "express";
import { jwtChecker } from "../utils/jwtChecker";
import  {expertLogin} from '../controller/expertController/authController'
import { updateExpertProfile } from "../controller/expertController/profileController";
const router=Router()

router.post('/login',expertLogin)
router.patch('/profile/:id',updateExpertProfile)

export default router