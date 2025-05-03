import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { CommonRequest } from "@common/types/common-request";
import { createAppError } from "@common/middlewares/error_handler";
import { LoginDto, RegisterDto, UpdateProfileDto } from "../dtos";
import AuthService from "../services/authService";

export default class AuthController {
  // ← inject the service here
  constructor(private readonly authService: AuthService) {}

  async register(req: Request, res: Response) {
    console.log("Register endpoint hit with body:", req.body);

    try {
      const input = plainToInstance(RegisterDto, req.body);
      console.log("Input validated:", input);

      // // no more req.scope; just use injected
      const user = await this.authService.register(input);
      console.log("User registered successfully:", user.id);

      const token = this.authService.generateToken(user);

      res.status(201).json({
        status: "success",
        data: { user, token }
      });
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  async login(req: Request, res: Response) {
    try {
      const input = plainToInstance(LoginDto, req.body);

      // call the service and return both user + token
      const { user, token } = await this.authService.login(input);

      res.status(200).json({
        status: "success",
        data: { user, token }
      });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async getProfile(req: Request, res: Response) {
    const user = (req as CommonRequest).loggedInUser;
    if (!user) throw createAppError("Not authenticated", 401);

    res.status(200).json({
      status: "success",
      data: { user }
    });
  }

  async updateProfile(req: Request, res: Response) {
    const user = (req as CommonRequest).loggedInUser;
    if (!user) throw createAppError("Not authenticated", 401);

    const input = plainToInstance(UpdateProfileDto, req.body);
    const updated = await this.authService.updateProfile(user.id, input);

    res.status(200).json({
      status: "success",
      data: { user: updated }
    });
  }
}
