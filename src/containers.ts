import { createContainer, InjectionMode, asClass, asValue } from "awilix";
import { DataSource } from "typeorm";
import AuthService    from "./modules/auth/services/authService";
import AuthController from "./modules/auth/controllers/authController";
import { AppDataSource } from "@loaders/db-loader";
import  UserManagementController  from "@modules/auth/controllers/userManagementController";
import UserService from "@modules/auth/services/userService";
import { CategoryController } from "@modules/menu/controllers/categoryController";
import CategoryService from "@modules/menu/services/categoryService";

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
  userManagementController: asClass(UserManagementController).scoped(),
  userService: asClass(UserService).scoped(),
  categoryController: asClass(CategoryController).scoped(),
  categoryService: asClass(CategoryService).scoped(),
});

export default container;
