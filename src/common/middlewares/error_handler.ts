import { Request, Response, NextFunction } from "express";

class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export const createAppError = (message: string, statusCode: number = 500): AppError => {
  return new AppError(message, statusCode);
};

export default (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  
  // Default error status and message
  let statusCode = 500;
  let message = "Internal Server Error";
  let errorResponse: any = { message };
  
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
    errorResponse = { message: "Validation Error", errors: (err as any).errors || [] };
  }
  
  // Add stack trace in development
  if (process.env.NODE_ENV === "development") {
    errorResponse.stack = err.stack;
  }
  
  res.status(statusCode).json({
    status: "error",
    ...errorResponse
  });
};

export { AppError };