'use strict';
import { Model } from 'sequelize';
import { bookingStatus } from '../utils/common/index.js';
const { BOOKED, INITIATED, CANCELLED, PENDING } = bookingStatus;
export default (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    flightId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    status:{
      type:DataTypes.ENUM,
      values: [BOOKED, INITIATED, CANCELLED, PENDING],
      defaultValue: INITIATED,
      allowNull: false,
    },
    totalCost: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    noOfSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // Assuming at least one seat is booked
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};