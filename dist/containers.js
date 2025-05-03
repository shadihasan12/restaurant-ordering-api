"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const awilix_1 = require("awilix");
const db_loader_1 = require("./loaders/db-loader");
// Create the container
const container = (0, awilix_1.createContainer)({
    injectionMode: awilix_1.InjectionMode.PROXY,
});
// Register common services
container.register({
    entityManager: (0, awilix_1.asValue)(db_loader_1.AppDataSource.manager),
});
exports.default = container;
