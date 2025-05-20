"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_handler_1 = require("./error_handler");
// Middleware to authenticate user from token
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw (0, error_handler_1.createAppError)("Not authenticated", 401);
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            throw (0, error_handler_1.createAppError)("Not authenticated", 401);
        }
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "your-secret-key");
        // Get authService from request-scoped container
        const authService = req.scope.resolve("authService");
        // Get user from database
        const user = yield authService.getUserById(decoded.userId);
        if (!user) {
            throw (0, error_handler_1.createAppError)("User not found or inactive", 401);
        }
        // Attach user to request (only once!)
        req.loggedInUser = user;
        next();
    }
    catch (error) {
        if (error.name === "JsonWebTokenError") {
            next((0, error_handler_1.createAppError)("Invalid token", 401));
        }
        else if (error.name === "TokenExpiredError") {
            next((0, error_handler_1.createAppError)("Token expired", 401));
        }
        else {
            next(error);
        }
    }
});
exports.authenticate = authenticate;
// Middleware to restrict access to specific roles
const restrictTo = (...roles) => {
    return (req, res, next) => {
        const user = req.loggedInUser;
        if (!user || !user.role) {
            return next((0, error_handler_1.createAppError)("Not authenticated", 401));
        }
        if (!roles.includes(user.role)) {
            return next((0, error_handler_1.createAppError)("Not authorized", 403));
        }
        next();
    };
};
exports.restrictTo = restrictTo;
