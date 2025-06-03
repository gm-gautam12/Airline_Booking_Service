import { StatusCodes } from "http-status-codes";
import {db} from "../models/index.js";
import CrudRepository from "./crud-repository.js";
const { Booking } = db;



class BookingRepository extends CrudRepository {

    constructor(){
        super(Booking);
    }
};

export default BookingRepository;