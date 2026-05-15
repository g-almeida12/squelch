import dotenv from "dotenv";
dotenv.config();

export const envConfig: Record<string, any> = {
  PORT: process.env.PORT,
  API_URL: process.env.API_URL,
  APP_URL: process.env.APP_URL,
  NODE_ENV: process.env.NODE_ENV
} as const;

for (const key of Object.keys(envConfig)) {
  if (!process.env[key]) {
    throw new Error(`[env.config] '${key}' not defined in '.env' file.`);
  }
}
