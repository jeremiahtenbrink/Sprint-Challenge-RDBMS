import { Response } from "express";

export interface error {
    status: number,
    message: string,
}

export const error = ( status: number, message: string ): error => {
    return {
        status,
        message
    }
};

export const sendError = ( error: error, res: Response ): void => {
    res.status( error.status || 500 ).json( {
        status: error.status || 500, message: error.message || "Server error"
    } );
};