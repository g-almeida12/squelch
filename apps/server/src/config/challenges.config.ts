import Database from "better-sqlite3";
import { existsSync, readFileSync, readdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { db } from "../shared/database/connection.js";

function populateChallengeDatabases() {
  console.log("\nPopulating challenges databases...");

  // Read all group folders
  const groups = readdirSync(join(process.cwd(), "challenge-groups"), {
    withFileTypes: true,
  });
  for (const group of groups) {
    if (group.isDirectory()) {
      const folderPath = join(process.cwd(), "challenge-groups", group.name);

      // Try to populate only if the 'group.db' does not exists
      const templateDb = join(folderPath, "group.db");

      // Get the setup to populate the database
      if (!existsSync(templateDb)) {
        const sqlSetup = join(folderPath, "setup.sql");
        if (!existsSync(sqlSetup)) {
          console.error(
            `\x1b[1;31m[challenges.config.ts] SQL file for ${group.name} challenge group population not created.\x1b[0;0m`,
          );
          process.exit(1);
        }

        const challengeDb = new Database(templateDb);
        const setupQueries = readFileSync(sqlSetup, "utf-8");

        // Populate the database
        try {
          challengeDb.exec(setupQueries);
          challengeDb.pragma("foreign_keys = ON");
          challengeDb.close();

          console.log(
            `--> Created '${group.name}' challenge group and its initial populated database.`,
          );
        } catch (err) {
          unlinkSync(templateDb);
          console.error(
            `\n\n\x1b[1;31m[challenges.config.ts] Error on attempting to populate a database:${err}\x1b[0;0m\n`,
          );
        }
      } else {
        console.log(`--> Challenge group '${group.name}' already created.`);
      }
    }
  }

  console.log("\nSuccessfully populated challenge databases.\n");
}

// !ADAPT TO PRISMA LATER
function insertChallengeTableRows() {
  console.log("\nInserting challenges on database...");

  const challengesSetupFile = join(
    process.cwd(),
    "challenge-groups",
    "challenges-insert-setup.sql",
  );
  if (!existsSync(challengesSetupFile)) {
    console.error(
      `[challenges.config.ts] SQL file for challenge insertion setup not created.`,
    );
    process.exit(1);
  }

  const challengeInsertionSetup = readFileSync(challengesSetupFile, "utf-8");
  const runSetupTransaction = db.transaction((sqlSetup: string) =>
    db.exec(sqlSetup),
  );

  try {
    runSetupTransaction(challengeInsertionSetup);
    console.log("\nSuccessfully inserted challenges on database.\n");
  } catch (err) {
    console.error(
      `\x1b[1;31m[challenges.config.ts] Fatal error on attempting to insert challenges on database:\n${err}\x1b[0;0m`,
    );
    process.exit(1);
  }
}

populateChallengeDatabases();
// insertChallengeTableRows();
