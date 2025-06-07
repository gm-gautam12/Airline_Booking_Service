import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../utils/common/index.js";
import { AppError } from "../utils/index.js";



const validatePaymentRequest = (req,res,next) => {
     if(!req.body.bookingId){
        errorResponse.message = "Something went wrong while making payment";
        errorResponse.error = new AppError(['Booking Id not found in the incoming request'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    if(!req.body.totalCost){
        errorResponse.message = "Something went wrong while making payment";
        errorResponse.error = new AppError(['Total cost not found in the incoming request'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    if(!req.body.userId){
        errorResponse.message = "Something went wrong while making payment";
        errorResponse.error = new AppError(['User Id not found in the incoming request'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    next();
};


export {validatePaymentRequest};