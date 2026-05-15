import Database from "better-sqlite3";
import { Server } from "http";
import path from "path";

const dbPath = path.resolve("database.db");

export const db = new Database(dbPath, {
  verbose: console.log,
});

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

export function closeDBConnection(server: Server, signal: string) {
  console.log("Closing database...");

  server.close(() => {
    console.log("Server closed");

    try {
      db.close();
    } catch (err) {
      console.error(
        "[connection.ts - closeDBConnection] Error in attempting to close the Databse.",
      );
    }

    process.exit(0);
  });

  setTimeout(() => console.warn("Forcing immediate termination."), 5000);
}
