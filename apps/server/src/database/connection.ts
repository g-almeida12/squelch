import Database from "better-sqlite3";
import { Server } from "http";
import { join } from "path";

const dbPath = join(process.cwd(), "database.db");

export const db = new Database(dbPath, {
  verbose: console.log,
});

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

export function closeDBConnection(server: Server, signal: string) {
  console.log(`Closing database by '${signal}' command...`);

  const timerId = setTimeout(() => {
    console.warn("Forcing immediate termination");
    process.exit(1);
  }, 5000);

  server.close(() => {
    console.log("Server closed");
    clearTimeout(timerId);

    try {
      db.close();
      console.log("Database closed");
    } catch (err) {
      console.error(
        "[connection.ts - closeDBConnection] Error in attempting to close the database",
      );
    }

    process.exit(0);
  });
}
