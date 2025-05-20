import { DataSource } from "typeorm";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Define contexts (server vs migrations)
export enum ContextEnum {
  SERVER = "server",
  MIGRATIONS = "migrations",
}

// Create the data source configuration
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "restaurant_ordering",
  synchronize:true,
  //  process.env.NODE_ENV === "development", // Automatic synchronization in development
  logging: process.env.NODE_ENV === "development", // Log SQL in development
  entities: [path.join(__dirname, "../modules/**/entities/*.{js,ts}")], // Path to entity files
  migrations: [path.join(__dirname, "../migrations/*.{js,ts}")], // Path to migration files
  subscribers: [],
});

// Initialize database connection
export default async (context: ContextEnum = ContextEnum.SERVER) => {
  try {
    await AppDataSource.initialize();
    console.log(`Database connection initialized (${context})`);
    return AppDataSource;
  } catch (error) {
    console.error(`Error during database initialization: ${error}`);
    throw error;
  }
};