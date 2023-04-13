import { adminAuthorization } from "../middleware/authHandler";
import { Router } from "express";
import { adminLogin } from "../controller/adminController/authController";
import { jwtChecker } from "../utils/jwtChecker";
import { fetchUsers,block_unblockUser } from "../controller/adminController/userController";
import { addService ,fetchServices,deleteService,fetchSingleService,editService} from "../controller/adminController/serviceController";
import { addLocation,fetchLocations,blockLocation,editLocation } from "../controller/adminController/locationController";
import { fetchBookings ,assignWorker} from "../controller/adminController/bookingController";
import {fetchExperts, addExpert,blockExpert } from "../controller/adminController/expertController";
import uploadCloudinary from "../utils/multer";
const router=Router()

router.get('/jwt',jwtChecker)
router.post('/login',adminLogin)
router.route('/locations').get(fetchLocations)
 router.use(adminAuthorization)
//user management
router.route('/users').get(fetchUsers).patch(block_unblockUser)
//service management
router.route('/services').get(fetchServices).post(uploadCloudinary.array('file'),addService)
router.route('/services/:id').get(fetchSingleService).put(uploadCloudinary.fields([{name:'image',maxCount:1},{name:'largeImage',maxCount:1}]),editService).delete(deleteService)

//location management
router.route('/locations').get(fetchLocations).post(addLocation)
router.route('/locations/:id').put(editLocation).patch(blockLocation)

//booking management
router.route('/bookings').get(fetchBookings)
router.route('/bookings/:id').patch(assignWorker)

//expert management
router.route('/experts').get(fetchExperts).post(addExpert)

router.route('/experts/:id').patch(blockExpert)
export default router
