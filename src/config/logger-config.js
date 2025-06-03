/* This code snippet is setting up a logging configuration using the Winston library in JavaScript.
Here's a breakdown of what each part is doing: */
import { createLogger,format,transports } from "winston";


const { combine, timestamp, printf } = format;

const customFormat = printf(({level, message, timestamp}) => {
    return `${timestamp} : ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        //label({ label: 'my-app' }),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        customFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'combined.log' }),
    ],
});

export {logger};