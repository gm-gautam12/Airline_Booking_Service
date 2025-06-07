import { Router } from "express";
import { infoController } from "../../controllers/index.js";
import bookingRoutes from "./booking-routes.js";

const router = Router();

router.get('/info', infoController);

router.use('/bookings', bookingRoutes);

export default router; 