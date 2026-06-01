import Database from "better-sqlite3";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const validGroupSlugs = [""];

console.log("\nConfigurating challenges databases...");
for (const groupSlug of validGroupSlugs) {
  const folderPath = join(process.cwd(), "challenges", groupSlug);
  if (!existsSync(folderPath)) {
    throw new Error(
      `[challenges.config.ts] Group slug '${groupSlug}' not created.`,
    );
  }

  const sqlSetup = join(folderPath, "config", "setup-template.sql");
  if (!existsSync(sqlSetup)) {
    throw new Error("[challenges.config.ts] SQL setup not created.");
  }

  const templateDB = join(folderPath, "config", "template.db");
  if (!existsSync(templateDB)) {
    const db = new Database(templateDB);
    const setupQueries = readFileSync(sqlSetup, "utf-8");

    db.exec(setupQueries);
    db.pragma("foreign_keys = ON");
    db.close();
    console.log(
      `Created '${groupSlug}' challenge group and its initial populated database.`,
    );
  } else {
    console.log(`Group slug '${groupSlug}' already created.`);
  }
}

console.log("Successfully configurated challenges databases.\n");
