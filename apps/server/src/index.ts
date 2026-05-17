import { envConfig } from "./config/env.config.js";
import { setupDatabase } from "./database/setup.js";
import { closeDBConnection } from "./database/connection.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

setupDatabase();

// App configurations
const app = express();
app.use(
  cors({
    origin: envConfig.APP_URL,
    credentials: true,
    allowedHeaders: ["X-XSRF-Token"],
  }),
);
app.use(express.json());
app.use(cookieParser());

// Routes

const server = app.listen(envConfig.PORT, () => {
  console.log(`Server running at ${envConfig.API_URL}`);
});

// Event listeners to safely close the db connection
process.on('SIGINT', () => closeDBConnection(server, 'SIGINT'));
process.on('SIGTERM', () => closeDBConnection(server, 'SIGTERM'));
