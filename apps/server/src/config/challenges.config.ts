import Database from "better-sqlite3";
import { existsSync, readFileSync, readdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { db } from "../shared/database/connection.js";

function populateChallengeDatabases() {
  console.log("\nPopulating challenges databases...");

  // Read all group folders
  const groups = readdirSync(join(process.cwd(), "challenges", "groups"), {
    withFileTypes: true,
  });
  for (const group of groups) {
    if (group.isDirectory()) {
      const folderPath = join(
        process.cwd(),
        "challenges",
        "groups",
        group.name,
      );

      // Try to populate only if the 'challenge.db' does not exists
      const templateDb = join(folderPath, "challenge.db");
      if (!existsSync(templateDb)) {
        const sqlSetup = join(folderPath, "setup.sql");
        if (!existsSync(sqlSetup)) {
          console.error(
            "[challenges.config.ts] SQL file for group setup not created.",
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
            `Created '${group.name}' challenge group and its initial populated database.`,
          );
        } catch (err) {
          unlinkSync(templateDb);
          console.error(
            "[challenges.config.ts] Error on attempting to populate a database: \n",
            err,
          );
        }
      } else {
        console.log(`Group slug '${group.name}' already created.`);
      }
    }
  }

  console.log("Successfully populated challenge databases.\n");
}

function createChallengeTableRows() {
  console.log("\nInserting challenges on database...");

  const challengesSetupFile = join(
    process.cwd(),
    "challenges",
    "challenges-creation-setup.sql",
  );
  if (!existsSync(challengesSetupFile)) {
    console.error(
      `[challenges.config.ts] SQL file for challenge creation setup not created.`,
    );
    process.exit(1);
  }

  const challengeCreationSetup = readFileSync(challengesSetupFile, "utf-8");
  const runSetupTransaction = db.transaction((sqlSetup: string) =>
    db.exec(sqlSetup),
  );

  try {
    runSetupTransaction(challengeCreationSetup);
    console.log("\nSuccessfully inserted challenges on database.\n");
  } catch (err) {
    console.log(
      "[challenges.config.ts] Fatal error on attempting to insert challenges on database: \n",
      err,
    );
    process.exit(1);
  }
}

populateChallengeDatabases();
createChallengeTableRows();
