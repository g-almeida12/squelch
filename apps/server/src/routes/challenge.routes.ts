import { Router } from "express";
import { challengeController } from "../config/factory.config.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";
import { autorizationMiddleware } from "../middlewares/autorization.middleware.js";

export const challengeRouter = Router({ mergeParams: true });
challengeRouter.use(authenticationMiddleware);

// Create route
challengeRouter.post("/", autorizationMiddleware, async (req, res) => {
  const { success, statusCode, body } = challengeController.create(req.body);

  return res.status(statusCode).json({ success, body });
});

// Find by ID route
challengeRouter.get("/:challengeId", async (req, res) => {
  const { success, statusCode, body } = challengeController.findById(
    req.params?.challengeId,
  );

  return res.status(statusCode).json({ success, body });
});

// Update by ID route
challengeRouter.patch(
  "/:challengeId",
  autorizationMiddleware,
  async (req, res) => {
    const { success, statusCode, body } = challengeController.updateById(
      req.params?.challengeId,
      req.body,
    );

    return res.status(statusCode).json({ success, body });
  },
);

// Delete by ID route
challengeRouter.delete(
  "/:challengeId",
  autorizationMiddleware,
  async (req, res) => {
    const { success, statusCode, body } = challengeController.deleteById(
      req.params?.challengeId,
    );

    return res.status(statusCode).json({ success, body });
  },
);
