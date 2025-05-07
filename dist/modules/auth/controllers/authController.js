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
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const error_handler_1 = require("../../../common/middlewares/error_handler");
const dtos_1 = require("../dtos");
class AuthController {
    // ← inject the service here
    constructor(authService) {
        this.authService = authService;
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Register endpoint hit with body:", req.body);
            try {
                const input = (0, class_transformer_1.plainToInstance)(dtos_1.RegisterDto, req.body);
                console.log("Input validated:", input);
                // // no more req.scope; just use injected
                const user = yield this.authService.register(input);
                console.log("User registered successfully:", user.id);
                const token = this.authService.generateToken(user);
                res.status(201).json({
                    status: "success",
                    data: { user, token }
                });
            }
            catch (error) {
                console.error("Registration error:", error);
                throw error;
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = (0, class_transformer_1.plainToInstance)(dtos_1.LoginDto, req.body);
                // call the service and return both user + token
                const { user, token } = yield this.authService.login(input);
                res.status(200).json({
                    status: "success",
                    data: { user, token }
                });
            }
            catch (error) {
                console.error("Login error:", error);
                throw error;
            }
        });
    }
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.loggedInUser;
            if (!user)
                throw (0, error_handler_1.createAppError)("Not authenticated", 401);
            res.status(200).json({
                status: "success",
                data: { user }
            });
        });
    }
    updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.loggedInUser;
            if (!user)
                throw (0, error_handler_1.createAppError)("Not authenticated", 401);
            const input = (0, class_transformer_1.plainToInstance)(dtos_1.UpdateProfileDto, req.body);
            const updated = yield this.authService.updateProfile(user.id, input);
            res.status(200).json({
                status: "success",
                data: { user: updated }
            });
        });
    }
}
exports.default = AuthController;
