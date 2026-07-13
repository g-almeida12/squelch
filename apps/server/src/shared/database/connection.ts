import { Server } from "http";
import { PrismaClient } from "./generated/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { envConfig } from "../../config/env.config.js";

const pgAdapter = new PrismaPg({ connectionString: envConfig.DATABASE_URL });
export const prisma = new PrismaClient({ adapter: pgAdapter });

export function closeDBConnection(server: Server, signal: string) {
  console.log(`Closing database by '${signal}' command...`);

  const timerId = setTimeout(() => {
    console.warn("\x1b[1;33mForcing immediate termination.\x1b[0;0m");
    process.exit(1);
  }, 10_000);

  server.close(async () => {
    console.log("Server closed");

    try {
      await prisma.$disconnect();
      console.log("Database closed");
    } catch (err) {
      console.error(
        `\n\n\x1b[1;31m[connection.ts] Error in attempting to close the database: \n${err}\x1b[0;0m`,
      );
    } finally {
      clearTimeout(timerId);
      process.exit(0);
    }
  });
}
