import { createBookingController, makePaymentController } from "../../controllers/index.js";
import { Router } from "express";

const router = Router();


/// Create a booking
/// api/v1/bookings POST
router.post('/', createBookingController);


router.post('/payments', makePaymentController);



export default router;