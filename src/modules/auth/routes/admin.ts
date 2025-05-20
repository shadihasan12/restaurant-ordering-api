


// src/modules/auth/routes/admin-routes.ts
import { Router } from "express";



import { AwilixContainer } from "awilix";
import  UserManagementController  from "../controllers/userManagementController";
import AuthController from "../controllers/authController";

export default (container: AwilixContainer) => {
  const router = Router();
  const authController = container.resolve<AuthController>("authController");

  const userManagementController = container.resolve<UserManagementController>("userManagementController");
//   container.resolve<UserManagementController>("userManagementController");
  
  // Get all users (admin only)
//   router.get(
//     "/users",
//     authenticate,

//     // requireRole([UserRole.ADMIN]),
//     userManagementController.getAllUsers.bind(userManagementController)
//   );
  
//   // Update user role (admin only)
//   router.patch(
//     "/users/:id/role",
//     authenticate,
//     // requireRole([UserRole.ADMIN]),
//     validate(UpdateUserRoleDto),
//     userManagementController.updateUserRole.bind(userManagementController)
//   );
  
  return router;
};