import { Request, Response, NextFunction } from "express";
import { validate as classValidate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { createAppError } from "./error_handler";

export const validate = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Validating body:", req.body);
      const dtoObj = plainToInstance(dtoClass, req.body);
      const errors = await classValidate(dtoObj, { 
        whitelist: true, 
        forbidNonWhitelisted: true 
      });

      if (errors.length > 0) {
        console.log("Validation errors:", errors);
        
        const formattedErrors = errors.map(error => ({
          property: error.property,
          constraints: error.constraints
        }));
        
        const error = createAppError("Validation failed", 400);
        (error as any).errors = formattedErrors;
        return next(error);
      }

      // Add validated data to request
      req.body = dtoObj;
      next();
    } catch (error) {
      console.error("Validation error:", error);
      next(error);
    }
  };
};