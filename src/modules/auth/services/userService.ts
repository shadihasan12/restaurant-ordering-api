// src/modules/auth/services/user-service.ts
import { EntityManager } from "typeorm";
import { User, UserRole } from "../entities/user";

import { plainToInstance } from "class-transformer";
import { createAppError } from "@common/middlewares/error_handler";

export default class UserService {
  constructor(private readonly entityManager: EntityManager) {}

  /**
   * Get all users in the system
   */
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.entityManager.find(User, {
        order: { created_at: "DESC" }
      });
      
      return plainToInstance(User, users);
    } catch (error) {
      throw createAppError(`Failed to retrieve users`, 500);
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<User> {
    const user = await this.entityManager.findOne(User, {
      where: { id: userId }
    });
    
    if (!user) {
      throw createAppError("User not found", 404);
    }
    
    return plainToInstance(User, user);
  }

  /**
   * Update a user's role
   */
  async updateUserRole(userId: string, role: UserRole): Promise<User> {
    try {
      const user = await this.getUserById(userId);
      
      // Update role
      user.role = role;
      await this.entityManager.save(user);
      
      return plainToInstance(User, user);
    } catch (error) {
      // Re-throw errors from getUserById
    //   if (error) {
    //     throw error;
    //   }
      
      throw createAppError(`Failed to update user role`, 500);
    }
  }
  
  /**
   * Create a new user with specific role
   * (Can be used for admin creation by existing admins)
   */
  async createUserWithRole(userData: any, role: UserRole): Promise<User> {
    try {
      // Check if user with email already exists
      const existingUser = await this.entityManager.findOne(User, {
        where: { email: userData.email }
      });
      
      if (existingUser) {
        throw createAppError("User with this email already exists", 400);
      }
      
      // Create new user
      const user = new User();
      user.firstName = userData.firstName;
      user.lastName = userData.lastName;
      user.email = userData.email;
      user.phone = userData.phone;
      user.password = userData.password; // This will trigger password hashing via setter
      user.role = role;
      
      const savedUser = await this.entityManager.save(user);
      return plainToInstance(User, savedUser);
    } catch (error) {
      if (error) {
        throw error;
      }
      
      throw createAppError(`Failed to create user`, 500);
    }
  }
}