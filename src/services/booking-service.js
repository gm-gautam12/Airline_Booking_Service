import axios from "axios";
import db from "../models/index.js";
import { FLIGHT_SERVICE_URL } from "../config/server-config.js";
import { AppError } from "../utils/index.js";
import { StatusCodes } from "http-status-codes";
import BookingRepository from "../repositories/booking-repository.js";


const bookingRepository = new BookingRepository();


const createBooking = async(data) => {

    const transaction = await db.sequelize.transaction();

    try {
        const flight = await axios.get(`${FLIGHT_SERVICE_URL}/api/v1/flights/${data.flightId}`);
        const flightData  =flight.data.data;
        if(data.noOfSeats > flightData.totalSeats){
            throw new AppError("No of seats are not available", StatusCodes.BAD_REQUEST);
        }
        const totalCostOfBooking = data.noOfSeats * flightData.price;
        const bookingData = {...data, totalCost: totalCostOfBooking};
        const booking  = await bookingRepository.createBooking(bookingData, transaction);
        await axios.patch(`${FLIGHT_SERVICE_URL}/api/v1/flights/${data.flightId}/seats`,{
            seats: data.noOfSeats
        });
        await transaction.commit();
        return booking;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};



export {
    createBooking
};


