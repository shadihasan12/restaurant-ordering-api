import { createContainer, InjectionMode, asClass, asValue } from "awilix";
import { DataSource } from "typeorm";
import AuthService    from "./modules/auth/services/authService";
import AuthController from "./modules/auth/controllers/authController";
import { AppDataSource } from "@loaders/db-loader";

// Suppose you have a TypeORM DataSource instance…
// import AppDataSource from "../db-loader";

const container = createContainer({
  // Switch the whole container over to CLASSIC mode
  injectionMode: InjectionMode.CLASSIC,
});

// Register your TypeORM EntityManager as a value
container.register({
  entityManager: asValue(AppDataSource.manager),
});

// Register your service and controller in scoped (per-request) lifetime
container.register({
  authService:    asClass(AuthService).scoped(),
  authController: asClass(AuthController).scoped(),
});

export default container;
