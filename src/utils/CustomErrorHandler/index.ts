import mongoose from 'mongoose';
import { CustomError, TErrHandler } from '../../types';

// Define the error handler function
export const CustomErrorHandler = ({ statusCode, message }: TErrHandler): CustomError => {
    const error = new Error(message) as CustomError;
    error.statusCode = statusCode;
    return error;
}

export const MongooseErrorHandler = (err: unknown) => {
    if (err instanceof mongoose.Error.MongooseServerSelectionError) {
        console.error('MongooseServerSelectionError:', err.message);
    } else if (err instanceof mongoose.Error.MissingSchemaError) {
        console.error('Missing Schema Error:', err.message);
    } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        console.error('Document Not found Error:', err.message);
    } else if (err instanceof mongoose.Error.MissingSchemaError) {
        console.error('Missing Schema Error:', err.message);
    } else if (err instanceof Error) {
        console.error('General error:', err.message);
    } else {
        console.error('Unknown error occurred');
    }
    return null;
};