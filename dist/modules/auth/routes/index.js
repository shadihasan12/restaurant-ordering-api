"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dtos_1 = require("../dtos");
// import { authenticate } from "@/common/middlewares/auth-middleware";
// import { validate } from "@/common/middlewares/validate";
const auth_middleware_1 = require("../../../common/middlewares/auth-middleware");
const validate_1 = require("../../../common/middlewares/validate");
// Export a function that takes the container and returns configured routes
exports.default = (container) => {
    const router = (0, express_1.Router)();
    // Resolve the controller from the container
    const authController = container.resolve("authController");
    // Bind controller methods to maintain correct 'this' context
    const register = authController.register;
    const login = authController.login.bind(authController);
    const getProfile = authController.getProfile.bind(authController);
    const updateProfile = authController.updateProfile.bind(authController);
    // Public routes
    router.post("/register", (0, validate_1.validate)(dtos_1.RegisterDto), register);
    router.post("/login", (0, validate_1.validate)(dtos_1.LoginDto), login);
    // Protected routes
    router.get("/profile", auth_middleware_1.authenticate, getProfile);
    router.patch("/profile", auth_middleware_1.authenticate, (0, validate_1.validate)(dtos_1.UpdateProfileDto), updateProfile);
    return router;
};
