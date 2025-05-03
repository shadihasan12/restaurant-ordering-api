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
exports.validate = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const error_handler_1 = require("./error_handler");
const validate = (dtoClass) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("Validating body:", req.body);
            const dtoObj = (0, class_transformer_1.plainToInstance)(dtoClass, req.body);
            const errors = yield (0, class_validator_1.validate)(dtoObj, {
                whitelist: true,
                forbidNonWhitelisted: true
            });
            if (errors.length > 0) {
                console.log("Validation errors:", errors);
                const formattedErrors = errors.map(error => ({
                    property: error.property,
                    constraints: error.constraints
                }));
                const error = (0, error_handler_1.createAppError)("Validation failed", 400);
                error.errors = formattedErrors;
                return next(error);
            }
            // Add validated data to request
            req.body = dtoObj;
            next();
        }
        catch (error) {
            console.error("Validation error:", error);
            next(error);
        }
    });
};
exports.validate = validate;
