import { createBookingService, makePaymentService } from "../services/index.js";
import { StatusCodes } from "http-status-codes";
import { errorResponse, ApiResponse } from "../utils/common/index.js";

const inMemDb = {}; // Simulating an in-memory database for idempotency keys

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
        const idempotencyKey = req.headers["x-idempotency-key"];
        if(!idempotencyKey) {
            return res.status(StatusCodes.BAD_REQUEST).json(
                new ApiResponse(
                    StatusCodes.BAD_REQUEST,
                    "Idempotency key is required",
                )
            );
        }
        if(inMemDb[idempotencyKey]) {
            return res.status(StatusCodes.BAD_REQUEST).json(
                new ApiResponse(
                    StatusCodes.BAD_REQUEST,
                    "Cannot repeat the same payment request",
                )
            )
        }
        inMemDb[idempotencyKey] = idempotencyKey; // Store the idempotency key
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