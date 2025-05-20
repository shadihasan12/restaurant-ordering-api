// src/modules/auth/dtos/user-management-dto.ts
import { IsEnum, IsNotEmpty } from "class-validator";
import { UserRole } from "../entities/user";

export class UpdateUserRoleDto {
  @IsNotEmpty()
  @IsEnum(UserRole, { 
    message: "Role must be one of: customer, staff, manager, admin" 
  })
  role!: UserRole;
}