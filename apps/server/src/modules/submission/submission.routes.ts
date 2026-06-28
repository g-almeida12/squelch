import { Router } from "express";
import { submissionController } from "../../config/factory.config.js";
import {
  authenticationMiddleware,
  AuthRequest,
} from "../../shared/middlewares/index.js";

export const submissionRouter = Router({ mergeParams: true });
submissionRouter.use(authenticationMiddleware);

// Run query route
submissionRouter.get(
  "/challenges/:challengeId/queries/run",
  async (req, res) => {
    const { success, statusCode, body } = await submissionController.runQuery(
      req.body?.submittedQuery,
      req.params?.challengeId,
    );

    return res.status(statusCode).json({ success, body });
  },
);

// Validation route
submissionRouter.post(
  "/challenges/:challengeId/submissions/run",
  async (req: AuthRequest, res) => {
    const { success, statusCode, body } =
      await submissionController.validateAndSave(
        req.body,
        req.params?.challengeId,
        req.user?.id,
      );

    return res.status(statusCode).json({ success, body });
  },
);

// Find all by challenge ID route
submissionRouter.get(
  "/challenges/:challengeId/submissions",
  async (req: AuthRequest, res) => {
    const { success, statusCode, body } =
      await submissionController.findByChallengeId(
        req.params?.challengeId,
        req.user?.id,
      );

    return res.status(statusCode).json({ success, body });
  },
);

// Find by ID route
submissionRouter.get(
  "/submissions/:submissionId",
  async (req: AuthRequest, res) => {
    const { success, statusCode, body } = await submissionController.findById(
      req.params?.submissionId,
      req.user?.id,
    );

    return res.status(statusCode).json({ success, body });
  },
);

// Find all By user ID route
submissionRouter.get("/submissions", async (req: AuthRequest, res) => {
  const { success, statusCode, body } = await submissionController.findByUserId(
    req.user?.id,
  );

  return res.status(statusCode).json({ success, body });
});
