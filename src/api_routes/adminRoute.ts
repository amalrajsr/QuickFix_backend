import { Authorization } from "../middleware/authHandler";
import { Router } from "express";
import { adminLogin } from "../controller/admin_controller/authController";
import { fetchUsers,block_unblockUser } from "../controller/admin_controller/userController";

const route=Router()

route.post('/login',adminLogin)

//user management
// route.use(Authorization)
route.get('/users',fetchUsers)
route.patch('/users',block_unblockUser)
export default route