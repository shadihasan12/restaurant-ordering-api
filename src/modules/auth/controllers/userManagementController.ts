// src/modules/auth/controllers/user-management-controller.ts
import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import UserService from "../services/userService";
import { UpdateUserRoleDto } from "../dtos/user-management-dto";


export default class UserManagementController {
  constructor(private readonly userService: UserService) {}
  
  async getAllUsers(req: Request, res: Response) {
    const users = await this.userService.getAllUsers();
    
    res.status(200).json({
      status: "success",
      data: { users }
    });
  }
  
  async updateUserRole(req: Request, res: Response) {
    const userId = req.params.id;
    const input = plainToInstance(UpdateUserRoleDto, req.body);
    
    const user = await this.userService.updateUserRole(userId, input.role);
    
    res.status(200).json({
      status: "success",
      data: { user }
    });
  }
}