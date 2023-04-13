import { Router } from "express";
import { jwtChecker } from "../utils/jwtChecker";
import  {expertLogin} from '../controller/expertController/authController'
import { updateExpertProfile } from "../controller/expertController/profileController";
import { viewWorks,updateWorkPayment } from "../controller/expertController/workController";
const router=Router()
router.get('/jwt',jwtChecker)
router.post('/login',expertLogin)
router.patch('/profile/:id',updateExpertProfile)
router.route('/works/:id').get(viewWorks).patch(updateWorkPayment)
export default router