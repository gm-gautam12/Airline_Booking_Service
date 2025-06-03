import { StatusCodes } from "http-status-codes";

const infoController = (req,res) => {
    res.status(StatusCodes.OK).json({
        success: true,
        message: "API is working",
        data: {
            name: "My API",
            version: "1.0.0",
            description: "This is a sample API"
        },
        error: {}
    });
}

export {infoController};
