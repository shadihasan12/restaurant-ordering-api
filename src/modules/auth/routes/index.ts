import { Router } from "express";
import { AwilixContainer } from "awilix";
import { validate } from "../../../common/middlewares/validate";
import { authenticate } from "../../../common/middlewares/auth-middleware";
import { RegisterDto, LoginDto, UpdateProfileDto } from "../dtos";
import AuthController from "../controllers/authController";

export default (container: AwilixContainer) => {
  const router = Router();

  // resolve controller (which has AuthService injected)
  const authController = container.resolve<AuthController>("authController");

  // bind EVERY method so `this` inside points at the controller instance
  const register      = authController.register.bind(authController);
  const login         = authController.login.bind(authController);
  const getProfile    = authController.getProfile.bind(authController);
  const updateProfile = authController.updateProfile.bind(authController);

  // public
  router.post("/register", register);
  router.post("/login",    validate(LoginDto),    login);

  // protected
  router.get( "/profile",            authenticate, getProfile);
  router.patch("/profile", authenticate, validate(UpdateProfileDto), updateProfile);

  return router;
};
