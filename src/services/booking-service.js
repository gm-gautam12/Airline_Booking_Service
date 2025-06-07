import axios from "axios";
import db from "../models/index.js";
import { FLIGHT_SERVICE_URL } from "../config/server-config.js";
import { AppError } from "../utils/index.js";
import { StatusCodes } from "http-status-codes";
import BookingRepository from "../repositories/booking-repository.js";
import { bookingStatus } from '../utils/common/index.js';
const { BOOKED,CANCELLED } = bookingStatus;


const bookingRepository = new BookingRepository();


const createBooking = async(data) => {

    const transaction = await db.sequelize.transaction();

    try {
        const flight = await axios.get(`${FLIGHT_SERVICE_URL}/api/v1/flights/${data.flightId}`);
        const flightData = flight.data.data;
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

// mimiking payment service
// This is a mock function to simulate payment processing

const makePayment = async (data) => {
    const transaction = await db.sequelize.transaction();
    try {
        const bookingDetails = await bookingRepository.get(data.bookingId, transaction);
        
        const bookingTime = new Date(bookingDetails.createdAt);
        const currentTime = new Date();
        if(currentTime - bookingTime > 300000) {
            await cancelBooking(data.bookingId);
            throw new AppError("Payment timeout", StatusCodes.GONE);
        }

        if(bookingDetails.totalCost !== data.totalCost) {
            throw new AppError("Total cost mismatch", StatusCodes.BAD_REQUEST);
        }

        if(bookingDetails.userId !== data.userId) {
            throw new AppError("User ID mismatch", StatusCodes.UNAUTHORIZED);
        }

        //assuming payment is successful
        await bookingRepository.update({status: BOOKED}, data.bookingId, transaction);
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


const cancelBooking = async(bookingId) => {
    const transaction = await db.sequelize.transaction();
    try {
        const bookingDetails = await bookingRepository.get(bookingId, transaction);

        if(bookingDetails.status === CANCELLED) {
            await transaction.commit();
            return true;
        }

        await axios.patch(`${FLIGHT_SERVICE_URL}/api/v1/flights/${bookingDetails.flightId}/seats`, {
            seats: bookingDetails.noOfSeats,
            decrease: false
        });

        await bookingRepository.update({status: CANCELLED}, bookingId, transaction);
        await transaction.commit();

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


const cancelOldBookings = async() => {
    try {
        const time = new Date(Date.now() - 1000 * 300);
        const response = await bookingRepository.cancelOldBooking(time);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export {
    createBooking,
    makePayment,
    cancelBooking,
    cancelOldBookings
};


