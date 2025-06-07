import { createBookingController, makePaymentController } from "../../controllers/index.js";
import { Router } from "express";
import { validatePaymentRequest } from "../../middlewares/index.js";

const router = Router();


/// Create a booking
/// api/v1/bookings POST
router.post('/', createBookingController);


router.post('/payments',validatePaymentRequest, makePaymentController);



export default router;