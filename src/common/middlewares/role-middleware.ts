

// src/common/middlewares/role-middleware.ts
import { CommonRequest } from "@common/types/common-request";
import { Request, Response, NextFunction } from "express";
import { createAppError } from "./error_handler";
import { UserRole } from "@modules/auth/entities/user";


export const requireRole = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as CommonRequest).loggedInUser;
      
      if (!user) {
        return next(createAppError("Authentication required", 401));
      }
      
      if (!roles.includes(user.role)) {
        return next(createAppError("You don't have permission to perform this action", 403));
      }
      
      next();
    } catch (error) {
      next(createAppError("Authorization error", 500));
    }
  };
};