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
exports.AppDataSource = exports.ContextEnum = void 0;
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Define contexts (server vs migrations)
var ContextEnum;
(function (ContextEnum) {
    ContextEnum["SERVER"] = "server";
    ContextEnum["MIGRATIONS"] = "migrations";
})(ContextEnum || (exports.ContextEnum = ContextEnum = {}));
// Create the data source configuration
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "restaurant_ordering",
    synchronize: process.env.NODE_ENV === "development", // Automatic synchronization in development
    logging: process.env.NODE_ENV === "development", // Log SQL in development
    entities: [path_1.default.join(__dirname, "../modules/**/entities/*.{js,ts}")], // Path to entity files
    migrations: [path_1.default.join(__dirname, "../migrations/*.{js,ts}")], // Path to migration files
    subscribers: [],
});
// Initialize database connection
exports.default = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (context = ContextEnum.SERVER) {
    try {
        yield exports.AppDataSource.initialize();
        console.log(`Database connection initialized (${context})`);
        return exports.AppDataSource;
    }
    catch (error) {
        console.error(`Error during database initialization: ${error}`);
        throw error;
    }
});
