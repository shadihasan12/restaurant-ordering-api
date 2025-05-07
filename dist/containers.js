"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const awilix_1 = require("awilix");
const authService_1 = __importDefault(require("./modules/auth/services/authService"));
const authController_1 = __importDefault(require("./modules/auth/controllers/authController"));
const db_loader_1 = require("./loaders/db-loader");
// Suppose you have a TypeORM DataSource instance…
// import AppDataSource from "../db-loader";
const container = (0, awilix_1.createContainer)({
    // Switch the whole container over to CLASSIC mode
    injectionMode: awilix_1.InjectionMode.CLASSIC,
});
// Register your TypeORM EntityManager as a value
container.register({
    entityManager: (0, awilix_1.asValue)(db_loader_1.AppDataSource.manager),
});
// Register your service and controller in scoped (per-request) lifetime
container.register({
    authService: (0, awilix_1.asClass)(authService_1.default).scoped(),
    authController: (0, awilix_1.asClass)(authController_1.default).scoped(),
});
exports.default = container;
