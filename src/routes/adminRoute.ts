import { authorization } from "../middleware/authHandler";
import { Router } from "express";
import { jwtChecker } from "../utils/jwtChecker";
import uploadCloudinary from "../utils/multer";
import { adminLogin } from "../controller/adminController/authController";
import {
  fetchUsers,
  block_unblockUser,
} from "../controller/adminController/userController";
import {
  addService,
  fetchServices,
  deleteService,
  fetchSingleService,
  editService,
} from "../controller/adminController/serviceController";
import {
  addLocation,
  fetchLocations,
  blockLocation,
  editLocation,
} from "../controller/adminController/locationController";
import {
  fetchBookings,
  assignExpert,
  changeExpert,
} from "../controller/adminController/bookingController";
import {
  fetchExperts,
  addExpert,
  blockExpert,
} from "../controller/adminController/expertController";
import {
  deleteReview,
  fetchReviews,
} from "../controller/adminController/reviewController";
import {
  getCount,
  getTotals,
} from "../controller/adminController/dashboardController";
import { validateBody } from "../utils/validateBody";
import {
  adminSchema,
  expertRegisterSchema,
  locationSchema,
  serviceSchema,
} from "../middleware/yupSchema";
import { validate_id } from "../utils/validateId";

const router = Router();

router.get("/jwt", jwtChecker);
router.post("/login", validateBody(adminSchema), adminLogin);
router.route("/locations").get(fetchLocations);
router.use(authorization);
//user management
router.route("/users").get(fetchUsers).patch(block_unblockUser);
//service management
router
  .route("/services")
  .get(fetchServices)
  .post(
    uploadCloudinary.array("file"),
    validateBody(serviceSchema),
    addService
  );
router
  .route("/services/:id")
  .get(validate_id, fetchSingleService)
  .put(
    uploadCloudinary.fields([
      { name: "image", maxCount: 1 },
      { name: "largeImage", maxCount: 1 },
    ]),
    validate_id,
    validateBody(serviceSchema),
    editService
  )
  .delete(validate_id, deleteService);

//location management
router
  .route("/locations")
  .get(fetchLocations)
  .post(validateBody(locationSchema), addLocation);
router
  .route("/locations/:id")
  .put(validate_id, validateBody(locationSchema), editLocation)
  .patch(validate_id, blockLocation);

//booking management
router.route("/bookings").get(fetchBookings);
router
  .route("/bookings/:id")
  .patch(validate_id, assignExpert)
  .put(validate_id, changeExpert);

//expert management
router
  .route("/experts")
  .get(fetchExperts)
  .post(validateBody(expertRegisterSchema), addExpert);
router.route("/experts/:id").patch(validate_id, blockExpert);

//review management
router.get("/reviews", fetchReviews);
router.delete("/reviews/:id", validate_id, deleteReview);

//dashboard
router.get("/dashboardDetails", getTotals);
router.get("/getCount", getCount);
export default router;
