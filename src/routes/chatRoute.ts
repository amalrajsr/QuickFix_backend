import { Router } from "express";
import { jwtChecker } from "../utils/jwtChecker";
import { authorization } from "../middleware/authHandler";
import { getAllMessages, getMessagesbyID, saveMessage } from "../controller/chatController.ts/chatController";
import { validate_id } from "../utils/validateId";


const router=Router()

router.get('/jwt',jwtChecker)
// router.use(authorization)
router.get('/conversations',getAllMessages)
router.route('/conversations/:id').get(validate_id, getMessagesbyID).post(validate_id,saveMessage)
export default router

