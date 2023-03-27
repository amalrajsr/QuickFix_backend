import { adminAuthorization } from "../middleware/authHandler";
import { Router } from "express";
import { adminLogin,adminJwtChecker } from "../controller/admin_controller/authController";
import { fetchUsers,block_unblockUser } from "../controller/admin_controller/userController";
import { addService ,fetchServices,deleteService,fetchSingleService,editService} from "../controller/admin_controller/serviceController";
import uploadCloudinary from "../utils/multer";
const router=Router()

router.get('/jwt',adminJwtChecker)
router.post('/login',adminLogin)
 router.use(adminAuthorization)
//user management
router.route('/users').get(fetchUsers).patch(block_unblockUser)
//service management
router.route('/services').get(fetchServices).post(uploadCloudinary.array('file'),addService)
router.route('/services/:id').get(fetchSingleService).put(uploadCloudinary.fields([{name:'image',maxCount:1},{name:'largeImage',maxCount:1}]),editService).delete(deleteService)
export default router