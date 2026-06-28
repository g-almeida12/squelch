import Database from "better-sqlite3";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import {} from "node:fs/promises";
import { join } from "node:path";
import { db } from "../shared/database/connection.js";

function populateChallengeDatabases() {
  console.log("\nPopulating challenges databases...");

  try {
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
        if (!existsSync(folderPath)) {
          throw new Error(
            `[challenges.config.ts] Folder for group slug '${group.name}' not created.`,
          );
        }

        const sqlSetup = join(folderPath, "setup.sql");
        if (!existsSync(sqlSetup)) {
          throw new Error(
            "[challenges.config.ts] SQL file for group setup not created.",
          );
        }

        const templateDb = join(folderPath, "challenge.db");
        if (!existsSync(templateDb)) {
          const challengeDb = new Database(templateDb);
          const setupQueries = readFileSync(sqlSetup, "utf-8");

          challengeDb.exec(setupQueries);
          challengeDb.pragma("foreign_keys = ON");
          challengeDb.close();

          console.log(
            `Created '${group.name}' challenge group and its initial populated database.`,
          );
        } else {
          console.log(`Group slug '${group.name}' already created.`);
        }
      }

      console.log("Successfully populated challenge databases.\n");
    }
  } catch (err) {
    console.error(err);
    throw new Error(
      "[challenges.config.ts] Error on attempting to initalize a challenge group.",
    );
  }
}

function createChallengeTableRows() {
  console.log("\nInserting challenges on database...");

  const challengesSetupFile = join(
    process.cwd(),
    "challenges",
    "challenges-creation-setup.sql",
  );
  if (!existsSync(challengesSetupFile)) {
    throw new Error(
      `[challenges.config.ts] SQL file for challenge creation setup  not created.`,
    );
  }

  const challengeCreationSetup = readFileSync(challengesSetupFile, "utf-8");
  db.exec(challengeCreationSetup);

  console.log("\nSuccessfully inserted challenges on database.\n");
}

populateChallengeDatabases();
createChallengeTableRows();
