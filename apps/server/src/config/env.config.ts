import dotenv from "dotenv";
dotenv.config();

export const envConfig = {
  PORT: process.env.PORT as string,
  API_URL: process.env.API_URL as string,
  APP_URL: process.env.APP_URL as string,
  NODE_ENV: process.env.NODE_ENV as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
} as const;

for (const key of Object.keys(envConfig)) {
  if (!process.env[key]) {
    throw new Error(`[env.config] '${key}' not defined in '.env' file.`);
  }
}
