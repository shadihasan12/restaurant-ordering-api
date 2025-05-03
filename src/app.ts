import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import "express-async-errors"; // This will allow using async functions without try/catch blocks
import dotenv from "dotenv";
import dbLoader, { ContextEnum } from "./loaders/db-loader";
import apiLoader from "./loaders/api-loader";
import container from "./containers";
import errorHandler from "./common/middlewares/error_handler";
import providersLoader from "./loaders/providers-loader";
// Load environment variables
dotenv.config();

// Initialize Express app
const app: Express = express();
///Users/mac/restaurant-ordering-api/src/loaders
// Apply middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Initialize app
export const initializeApp = async (): Promise<Express> => {
  try {
    // Connect to database
    await dbLoader(ContextEnum.SERVER);
    

    await providersLoader(); 
    // Load API routes
    await apiLoader({ app, container });
    
    // Apply error handling middleware last
    app.use(errorHandler);
    
    return app;
  } catch (error) {
    console.error("Failed to initialize app:", error);
    throw error;
  }
};

export default app;