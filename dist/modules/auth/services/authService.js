"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Import proper types
const class_transformer_1 = require("class-transformer");
const user_1 = require("../entities/user");
const error_handler_1 = require("../../../common/middlewares/error_handler");
class AuthService {
    constructor(entityManager) {
        this.entityManager = entityManager;
    }
    generateToken(user) {
        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role
        };
        // Get JWT secret from environment or use fallback
        const secret = process.env.JWT_SECRET || "your-secret-key";
        // Define options with proper type
        // Use type assertion to tell TypeScript this is valid
        const options = {
            expiresIn: process.env.JWT_EXPIRES_IN || "24h"
        };
        // Sign and return token
        return jsonwebtoken_1.default.sign(payload, secret, options);
    }
    // Rest of the service code...
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.entityManager.findOne(user_1.User, {
                where: [
                    { email: data.email },
                    { phone: data.phone }
                ]
            });
            if (existingUser) {
                throw (0, error_handler_1.createAppError)("User with this email or phone already exists", 400);
            }
            const user = new user_1.User();
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.email = data.email;
            user.phone = data.phone;
            user.password = data.password; // This will be hashed by the entity
            const savedUser = yield this.entityManager.save(user);
            return (0, class_transformer_1.plainToInstance)(user_1.User, savedUser);
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.entityManager.findOne(user_1.User, {
                where: { email: data.email }
            });
            if (!user) {
                throw (0, error_handler_1.createAppError)("Invalid email or password", 401);
            }
            const isPasswordValid = yield user.verifyPassword(data.password);
            if (!isPasswordValid) {
                throw (0, error_handler_1.createAppError)("Invalid email or password", 401);
            }
            user.lastLogin = new Date();
            yield this.entityManager.save(user);
            const token = this.generateToken(user);
            return {
                user: (0, class_transformer_1.plainToInstance)(user_1.User, user),
                token
            };
        });
    }
    updateProfile(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.entityManager.findOne(user_1.User, {
                where: { id: userId }
            });
            if (!user) {
                throw (0, error_handler_1.createAppError)("User not found", 404);
            }
            // Check if phone number is being changed and is already taken
            if (data.phone && data.phone !== user.phone) {
                const existingUser = yield this.entityManager.findOne(user_1.User, {
                    where: { phone: data.phone }
                });
                if (existingUser) {
                    throw (0, error_handler_1.createAppError)("Phone number is already in use", 400);
                }
            }
            // Update fields
            if (data.firstName)
                user.firstName = data.firstName;
            if (data.lastName)
                user.lastName = data.lastName;
            if (data.phone)
                user.phone = data.phone;
            if (data.password)
                user.password = data.password;
            // Save updated user
            yield this.entityManager.save(user);
            return (0, class_transformer_1.plainToInstance)(user_1.User, user);
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.entityManager.findOne(user_1.User, {
                where: { id: userId }
            });
            return user ? (0, class_transformer_1.plainToInstance)(user_1.User, user) : null;
        });
    }
}
exports.default = AuthService;
