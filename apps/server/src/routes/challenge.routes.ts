import { Router } from "express";
import { challengeController } from "../config/factory.config.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";

export const challengeRouter = Router({ mergeParams: true });
challengeRouter.use(authenticationMiddleware);

// Find by ID route
challengeRouter.get("/challenges/:challengeId", async (req, res) => {
  const { success, statusCode, body } = await challengeController.findById(
    req.params?.challengeId,
  );

  return res.status(statusCode).json({ success, body });
});
