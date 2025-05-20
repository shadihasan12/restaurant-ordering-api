import { Express, Router } from "express";
import { AwilixContainer } from "awilix";
import authRoutes from "../modules/auth/routes";
// import adminRoutes from "@modules/auth/routes/admin-routes";
import categoryRouter from "@modules/menu/routers";
import adminRoutes from "@modules/auth/routes/admin";

type ApiLoaderOptions = {
  app: Express;
  container: AwilixContainer;
};

export default async ({ app, container }: ApiLoaderOptions): Promise<Express> => {
  // Create main router
  const router = Router();
  
  app.use((req: any, res, next) => {
    console.log("Applying scope middleware");
    req.container = container;
    req.scope = container.createScope();
    next();
  });
  // API version prefix
  app.use("/api/v1", router);


  // Register scope middleware to provide request-scoped container
 
  
  // Health check endpoint
  router.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });
  
  // Apply route modules - pass the container to each route module
  router.use("/auth", authRoutes(container));
  router.use("/admin", adminRoutes(container));
  router.use("/category", categoryRouter(container));
  
  // Future routes will follow the same pattern:
  // router.use("/restaurants", restaurantRoutes(container));
  // router.use("/menu", menuRoutes(container));
  // router.use("/orders", orderRoutes(container));
  
  return app;
};