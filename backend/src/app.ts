import "express-async-errors";

import express, { Express } from "express";

import routes from "@/routes";
import { configureErrorMiddleware } from "@/middlewares/error.middleware";
import { configurePreRouteMiddleware } from "@/middlewares/pre-route.middleware";

const app: Express = express();

// Pre Route Middlewares
configurePreRouteMiddleware(app);

// Routes
app.use(routes);

// Error middlewares
configureErrorMiddleware(app);

export default app;
