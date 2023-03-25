import { adminAuthorization } from "../middleware/authHandler";
import { Router } from "express";
import { adminLogin } from "../controller/admin_controller/authController";
import { fetchUsers,block_unblockUser } from "../controller/admin_controller/userController";
import { addService ,fetchServices,deleteService} from "../controller/admin_controller/serviceController";
import uploadCloudinary from "../utils/multer";
const router=Router()

router.post('/login',adminLogin)
router.use(adminAuthorization)
//user management
router.route('/users').get(fetchUsers).patch(block_unblockUser)
//service management
router.route('/services').get(fetchServices).post(uploadCloudinary.single('file'),addService)
router.delete('/services/:id',deleteService)
export default router