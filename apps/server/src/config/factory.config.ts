import AuthController from "../controllers/auth.controller.js";
import AuthRepository from "../repositories/auth.repository.js";
import UserRepository from "../repositories/user.repository.js";
import AuthService from "../services/auth.service.js";
import UserService from "../services/user.services.js";
import UserController from "../controllers/user.controller.js";
import ChallengeRepository from "../repositories/challenge.repository.js";
import ChallengeService from "../services/challenge.service.js";
import ChallengeController from "../controllers/challenge.controller.js";
import SubmissionRepository from "../repositories/submissions.repository.js";
import SubmissionService from "../services/submissions.service.js";
import SubmissionController from "../controllers/submission.controller.js";
import CronController from "../controllers/cron.controller.js";

export const userRepository = new UserRepository();
export const userService = new UserService(userRepository);
export const userController = new UserController(userService);

export const authRepository = new AuthRepository(userRepository);
export const authService = new AuthService(authRepository, userRepository);
export const authController = new AuthController(authService);

export const cronController = new CronController();

export const challengeRepository = new ChallengeRepository();
export const challengeService = new ChallengeService(challengeRepository);
export const challengeController = new ChallengeController(challengeService);

export const submissionRepository = new SubmissionRepository();
export const submissionService = new SubmissionService(submissionRepository);
export const submissionController = new SubmissionController(submissionService);