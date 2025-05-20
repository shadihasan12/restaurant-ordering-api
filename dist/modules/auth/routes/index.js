"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = require("../../../common/middlewares/validate");
const auth_middleware_1 = require("../../../common/middlewares/auth-middleware");
const dtos_1 = require("../dtos");
exports.default = (container) => {
    const router = (0, express_1.Router)();
    // resolve controller (which has AuthService injected)
    const authController = container.resolve("authController");
    // bind EVERY method so `this` inside points at the controller instance
    const register = authController.register.bind(authController);
    const login = authController.login.bind(authController);
    const getProfile = authController.getProfile.bind(authController);
    const updateProfile = authController.updateProfile.bind(authController);
    // public
    router.post("/register", register);
    router.post("/login", (0, validate_1.validate)(dtos_1.LoginDto), login);
    // protected
    router.get("/profile", auth_middleware_1.authenticate, getProfile);
    router.patch("/profile", auth_middleware_1.authenticate, (0, validate_1.validate)(dtos_1.UpdateProfileDto), updateProfile);
    return router;
};
