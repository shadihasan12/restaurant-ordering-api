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
const app_1 = require("./app");
const port = process.env.PORT || 3000;
// Start the server
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const app = yield (0, app_1.initializeApp)();
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
        // Handle unexpected errors
        process.on("unhandledRejection", (reason, promise) => {
            console.error("Unhandled Rejection at:", promise, "reason:", reason);
            // In production, you might want to notify administrators
        });
    }
    catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
});
// Run the server
startServer();
