import { envConfig } from "./config/env.config.js";
import { closeDBConnection } from "./shared/database/connection.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./shared/middlewares/error.middleware.js";
import { authRouter } from "./modules/auth/index.js";
import { userRouter } from "./modules/user/index.js";
import { challengeRouter } from "./modules/challenge/index.js";
import { submissionRouter } from "./modules/submission/index.js";

// App configurations
const app = express();
app.use(
  cors({
    origin: envConfig.APP_URL,
    credentials: true,
    allowedHeaders: ["X-XSRF-Token", "Content-Type"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", challengeRouter);
app.use("/", submissionRouter);

// Error middleware
app.use(errorMiddleware);

const server = app.listen(envConfig.PORT, () => {
  console.log(`Server running at ${envConfig.API_URL}`);
});

// Event listeners to safely close the db connection
process.on("SIGINT", () => closeDBConnection(server, "SIGINT"));
process.on("SIGTERM", () => closeDBConnection(server, "SIGTERM"));
