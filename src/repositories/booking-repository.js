import { StatusCodes } from "http-status-codes";
import db from "../models/index.js";
import CrudRepository from "./crud-repository.js";
const { Booking } = db;
import { AppError } from "../utils/index.js";
import { Op } from "sequelize";
import { bookingStatus } from '../utils/common/index.js';
const { CANCELLED,BOOKED } = bookingStatus;


class BookingRepository extends CrudRepository {

    constructor(){
        super(Booking);
    }

    async createBooking(data,transaction) {
        const response = await Booking.create(data, {transaction});
        return response;
    }

    async get(data,transaction) {
        const response = await Booking.findByPk(data,{transaction: transaction});
        if(!response){
            throw new AppError("Not able to find the resource", StatusCodes.NOT_FOUND);
        }
        return response;

    }

    async update(data, id, transaction) { 
       
        const response = await Booking.update(data,{
        where: {
            id: id
            }
        },{transaction: transaction});
        return response;
    }

    async cancelOldBooking(timestamp) {
        const response = await this.model.update({status: CANCELLED},{
            where: {
                [Op.and]: [
                    {
                        createdAt: {
                            [Op.lt]: timestamp
                        }, 

                    },
                    {
                        status: {
                            [Op.ne]: BOOKED
                        }
                    },
                    {
                        status: {
                            [Op.ne]: CANCELLED
                        }
                    }
                ]
            }
        })
        return response;
    }
};

export default BookingRepository;