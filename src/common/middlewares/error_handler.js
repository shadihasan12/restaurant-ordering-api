"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = exports.createAppError = void 0;
class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const createAppError = (message, statusCode = 500) => {
    return new AppError(message, statusCode);
};
exports.createAppError = createAppError;
exports.default = (err, req, res, next) => {
    console.error("Error:", err);
    // Default error status and message
    let statusCode = 500;
    let message = "Internal Server Error";
    let errorResponse = { message };
    // If it's our custom error, use its status and message
    if ("statusCode" in err) {
        statusCode = err.statusCode;
        message = err.message;
        errorResponse = { message };
    }
    // Handle TypeORM errors (we'll expand this later)
    if (err.name === "QueryFailedError") {
        statusCode = 400;
        message = "Database query failed";
        errorResponse = { message };
    }
    // Handle validation errors
    if (err.name === "ValidationError") {
        statusCode = 400;
        errorResponse = { message: "Validation Error", errors: err.errors || [] };
    }
    // Add stack trace in development
    if (process.env.NODE_ENV === "development") {
        errorResponse.stack = err.stack;
    }
    res.status(statusCode).json(Object.assign({ status: "error" }, errorResponse));
};
