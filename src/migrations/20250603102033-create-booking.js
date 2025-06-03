'use strict';
/** @type {import('sequelize-cli').Migration} */
import { bookingStatus } from '../utils/common/index.js';
const { BOOKED, INITIATED, CANCELLED, PENDING } = bookingStatus;
export const up = async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
      type:Sequelize.INTEGER,
      allowNull: false,
      },
      status:{
      type:Sequelize.ENUM,
      values: [BOOKED, INITIATED, CANCELLED, PENDING],
      defaultValue: INITIATED,
      allowNull: false,
    },
      totalCost: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      noOfSeats: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1, // Assuming at least one seat is booked
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  };
export const down =  async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bookings');
  }