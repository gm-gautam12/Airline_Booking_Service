import { StatusCodes } from "http-status-codes";
import db from "../models/index.js";
import CrudRepository from "./crud-repository.js";
const { Booking } = db;



class BookingRepository extends CrudRepository {

    constructor(){
        super(Booking);
    }

    async createBooking(data,transaction) {
        const response = await Booking.create(data, {transaction});
        return response;
    }
};

export default BookingRepository;