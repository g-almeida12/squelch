import { NextFunction, Request, Response } from "express";
import { extname, join } from "node:path";
import { readdir, stat, unlink } from "node:fs/promises";
import { envConfig } from "../config/env.config.js";
import ApplicationError from "../helpers/errors/application.error.js";

export default class CronController {
  async deleteOldDatabases(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["x-cron-secret"];
    if (token !== envConfig.CRON_SECRET) {
      return next(
        new ApplicationError("Credentiais inválidas fornecidas.", 403),
      );
    }

    const folderPath = join(process.cwd(), "challenges");
    const maxTime = 1000 * 60 * 60 * 24 * 7; // Seven days
    const now = Date.now();

    try {
      let deletedFilesCount = 0;
      const challengesFolders = await readdir(folderPath);

      for (const folder of challengesFolders) {
        try {
          const folderStats = await stat(join(folderPath, folder));
          if (!folderStats.isDirectory()) continue;

          const challengesFiles = await readdir(join(folderPath, folder));

          for (const file of challengesFiles) {
            try {
              if (extname(file) === ".db") {
                const userSessionFile = join(folderPath, folder, file);
                const fileStats = await stat(userSessionFile);

                if (now - fileStats.mtime.getTime() > maxTime) {
                  await unlink(userSessionFile);
                  deletedFilesCount++;
                }
              }
            } catch (fileErr) {
              console.error(
                `Error on attempting to cleanup user database session file '${file}: '`,
                fileErr,
              );
            }
          }
        } catch (folderErr) {
          console.error(
            `Error on attempting to cleanup a challenge database folder '${folder}: '`,
            folderErr,
          );
        }
      }

      return res.status(200).json({
        message: `Cleanup completed. ${deletedFilesCount} files deleted.`,
      });
    } catch (err) {
      console.error(err);
      return next(
        new ApplicationError(
          "Error on attempting to cleanup old databases sessions.",
          500,
        ),
      );
    }
  }
}
