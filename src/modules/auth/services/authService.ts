import { EntityManager } from "typeorm";
import jwt, { Secret, SignOptions } from "jsonwebtoken"; // Import proper types


import { RegisterDto, LoginDto, UpdateProfileDto } from "../dtos";

import { plainToInstance } from "class-transformer";
import { User } from "../entities/user";
import { createAppError } from "@common/middlewares/error_handler";
// import { createAppError } from "@/common/middlewares/error_handler";




interface JwtPayload {
    userId: string;
    email: string;
    role: string;
  }
  
export default class AuthService {


    constructor(private readonly entityManager: EntityManager) {}


    public generateToken(user: User): string {
        const payload: JwtPayload = {
          userId: user.id,
          email: user.email,
          role: user.role
        };
        
        // Get JWT secret from environment or use fallback
        const secret: Secret = process.env.JWT_SECRET || "your-secret-key";
        
        // Define options with proper type
           // Use type assertion to tell TypeScript this is valid
    const options = { 
        expiresIn: process.env.JWT_EXPIRES_IN || "24h" 
      } as SignOptions;
        
        // Sign and return token
        return jwt.sign(payload, secret, options);
      }
    
      // Rest of the service code...
    

    async register(data: RegisterDto): Promise<User> {
        const existingUser = await this.entityManager.findOne(User, {
            where :[
                {email: data.email},
                {phone: data.phone}
               
            ]
        });

        if (existingUser) {
             throw createAppError("User with this email or phone already exists", 400)
        }

       

        const user = new User();
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.email = data.email;
        user.phone = data.phone;
        user.password = data.password; // This will be hashed by the entity

        const savedUser = await this.entityManager.save(user)

       return plainToInstance(User, savedUser)

    }


    async login(data:LoginDto): Promise<{user: User; token:string}> {
       
             const user = await this.entityManager.findOne(User , {
                where :
                   { email:data.email}
                
             })

             if (!user) {
                throw createAppError("Invalid email or password", 401);
             }

             const isPasswordValid = await user.verifyPassword(data.password);

             if (!isPasswordValid) {
                throw createAppError("Invalid email or password", 401);
             }

             user.lastLogin = new Date();

             await this.entityManager.save(user);


             const token = this.generateToken(user);

             return {
                user: plainToInstance(User, user),
                token
              };
    }


    async updateProfile(userId: string,data: UpdateProfileDto): Promise<User>{
        const user = await this.entityManager.findOne(User, {
            where: { id: userId }
          });


        
      if (!user) {
      throw createAppError("User not found", 404);
    }
   // Check if phone number is being changed and is already taken
    if (data.phone && data.phone !== user.phone) {
        const existingUser = await this.entityManager.findOne(User, {
          where: { phone: data.phone }
        });
        if (existingUser) {
          throw createAppError("Phone number is already in use", 400);
        }
      }

       // Update fields
    if (data.firstName) user.firstName = data.firstName;
    if (data.lastName) user.lastName = data.lastName;
    if (data.phone) user.phone = data.phone;
    if (data.password) user.password = data.password;

     // Save updated user
     await this.entityManager.save(user);
     return plainToInstance(User, user);
    }

    async getUserById(userId: string): Promise<User | null> {
        const user = await this.entityManager.findOne(User, {
          where: { id: userId }
        });
        
        return user ? plainToInstance(User, user) : null;
      }
    
}