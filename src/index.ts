import { initializeApp } from "./app";

const port = process.env.PORT || 3000;

// Start the server
const startServer = async () => {
  try {
    const app = await initializeApp();
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
    
    // Handle unexpected errors
    process.on("unhandledRejection", (reason, promise) => {
      console.error("Unhandled Rejection at:", promise, "reason:", reason);
      // In production, you might want to notify administrators
    });
    
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

// Run the server
startServer();