// src/common/middlewares/auth-middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import AuthService from "../../modules/auth/services/authService";
import { CommonRequest } from "../types/common-request";
import { createAppError } from "./error_handler";

// Middleware to authenticate user from token
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw createAppError("Not authenticated", 401);
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw createAppError("Not authenticated", 401);
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as any;

    // Get user from service
    const authService = (req as CommonRequest).scope.resolve<AuthService>("authService");
    const user = await authService.getUserById(decoded.userId);

    if (!user || !user.isActive) {
      throw createAppError("User not found or inactive", 401);
    }

    // Attach user to request as loggedInUser to match CommonRequest interface
    (req as CommonRequest).loggedInUser = user;
    next();
  } catch (error) {
    if (error === "JsonWebTokenError") {
      next(createAppError("Invalid token", 401));
    } else if (error === "TokenExpiredError") {
      next(createAppError("Token expired", 401));
    } else {
      next(error);
    }
  }
};

// Middleware to restrict access to specific roles
export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as CommonRequest).loggedInUser;
    
    if (!user) {
      return next(createAppError("Not authenticated", 401));
    }

    if (!roles.includes(user.role)) {
      return next(createAppError("Not authorized", 403));
    }

    next();
  };
};