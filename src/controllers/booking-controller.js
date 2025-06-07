import { createBookingService, makePaymentService } from "../services/index.js";
import { StatusCodes } from "http-status-codes";
import { errorResponse, ApiResponse } from "../utils/common/index.js";


const createBookingController = async(req,res) => {
    try {
        const response = await createBookingService({
            flightId: req.body.flightId,
            userId: req.body.userId,
            noOfSeats: req.body.noOfSeats,
        });
        return res.status(StatusCodes.CREATED).json(
            new ApiResponse(
                StatusCodes.CREATED,
                "Booking created successfully",
                response
            )
        );
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
};

const makePaymentController = async(req,res) => {
    try {
        const response = await makePaymentService({
            bookingId: req.body.bookingId,
            totalCost: req.body.totalCost,
            userId: req.body.userId,
        });
        return res.status(StatusCodes.CREATED).json(
            new ApiResponse(
                StatusCodes.CREATED,
                "Payment done successfully",
                response
            )
        );
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
};


export {
    createBookingController,
    makePaymentController
};