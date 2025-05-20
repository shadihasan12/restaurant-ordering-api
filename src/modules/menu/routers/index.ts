import { Router } from "express";
import { AwilixContainer } from "awilix";
import { validate } from "../../../common/middlewares/validate";
import { CategoryController } from "../controllers/categoryController";
import { CreateCategoryDto, UpdateCategoryDto } from "../dtos";
import { UserRole } from "@modules/auth/entities/user";
import { Admin } from "typeorm";
import { requireRole } from "@common/middlewares/role-middleware";
import { authenticate } from "@common/middlewares/auth-middleware";

export default (container: AwilixContainer) => {
  const router = Router();

  // resolve controller (which has AuthService injected)
  const categoryController = container.resolve<CategoryController>("categoryController");

  // bind EVERY method so `this` inside points at the controller instance
  const create = categoryController.create.bind(categoryController);
  const update = categoryController.update.bind(categoryController);
  const getAll = categoryController.getAll.bind(categoryController);


  // public
  router.post("/create", validate(CreateCategoryDto), authenticate, requireRole([UserRole.ADMIN]), create);
  router.get("/", validate(CreateCategoryDto), authenticate, requireRole([UserRole.ADMIN]), getAll);
  router.post("/update/:id", validate(UpdateCategoryDto), authenticate, requireRole([UserRole.ADMIN]), update);

//   router.post("/login",    validate(LoginDto),    login);

//   // protected
//   router.get( "/profile",            authenticate, getProfile);
//   router.patch("/profile", authenticate, validate(UpdateProfileDto), updateProfile);

  return router;
};
