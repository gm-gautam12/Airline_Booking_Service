import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const FLIGHT_SERVICE_URL = process.env.FLIGHT_SERVICE_URL;