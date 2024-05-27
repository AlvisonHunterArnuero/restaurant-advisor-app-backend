// Extend the built-in Error interface
export interface CustomError extends Error {
    statusCode: number;
}

// Define the type for the error handler input
export type TErrHandler = {
    statusCode: number,
    message: string,
}