import { createBookingController } from "../../controllers/index.js";
import { Router } from "express";

const router = Router();


/// Create a booking
/// api/v1/bookings POST
router.post('/', createBookingController);



export default router;