import { prisma } from "../connection.js";
import * as CHALLENGES from "./seed-data/challenges/index.js";

(async function insertChallengeTableRows() {
  try {
    console.log("\nInserting challenges in database...");
    const allChallenges = Object.values(CHALLENGES).flat();

    for (const challenge of allChallenges) {
      await prisma.challenge.upsert({
        where: { title: challenge.title },
        update: {
          title: challenge.title,
          validation_query: challenge.validation_query,
          difficulty: challenge.difficulty,
          group_slug: challenge.group_slug,
          group_title: challenge.group_title,
          markdown: challenge.markdown,
        },
        create: challenge,
      });

      console.log(`--> Created/updated challenge '${challenge.position} - ${challenge.title}'.`);
    }

    await prisma.challenge.createMany({
      data: allChallenges,
      skipDuplicates: true,
    });

    console.log(`Successfully inserted challenges in database.`);
  } catch (err) {
    console.error(
      `\n\n\x1b[1;31m[seed.ts] Error on attempting to insert challenges in database:  \n${err}\x1b[0;0m`,
    );
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
