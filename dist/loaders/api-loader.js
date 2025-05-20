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
const express_1 = require("express");
const routes_1 = __importDefault(require("../modules/auth/routes"));
exports.default = (_a) => __awaiter(void 0, [_a], void 0, function* ({ app, container }) {
    // Create main router
    const router = (0, express_1.Router)();
    app.use((req, res, next) => {
        console.log("Applying scope middleware");
        req.container = container;
        req.scope = container.createScope();
        next();
    });
    // API version prefix
    app.use("/api/v1", router);
    // Register scope middleware to provide request-scoped container
    // Health check endpoint
    router.get("/health", (req, res) => {
        res.status(200).json({ status: "ok" });
    });
    // Apply route modules - pass the container to each route module
    router.use("/auth", (0, routes_1.default)(container));
    // Future routes will follow the same pattern:
    // router.use("/restaurants", restaurantRoutes(container));
    // router.use("/menu", menuRoutes(container));
    // router.use("/orders", orderRoutes(container));
    return app;
});
