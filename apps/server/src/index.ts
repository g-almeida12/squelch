import "./database/setup.js";
import "./config/challenges.config.js";
import { envConfig } from "./config/env.config.js";
import { closeDBConnection } from "./database/connection.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { challengeRouter } from "./routes/challenge.routes.js";
import { submissionRouter } from "./routes/submissions.routes.js";
import { cronController } from "./config/factory.config.js";

// App configurations
const app = express();
app.use(
  cors({
    origin: envConfig.APP_URL,
    credentials: true,
    allowedHeaders: ["X-XSRF-Token", "X-CRON-Secret"],
  }),
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/cron-jobs/delete-old-databases", cronController.deleteOldDatabases);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/challenges", challengeRouter);
app.use("/submissions", submissionRouter);

// Error middleware
app.use(errorMiddleware);

const server = app.listen(envConfig.PORT, () => {
  console.log(`Server running at ${envConfig.API_URL}`);
});

// Event listeners to safely close the db connection
process.on("SIGINT", () => closeDBConnection(server, "SIGINT"));
process.on("SIGTERM", () => closeDBConnection(server, "SIGTERM"));
