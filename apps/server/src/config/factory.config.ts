import {
  AuthController,
  AuthRepository,
  AuthService,
} from "../modules/auth/index.js";
import {
  UserRepository,
  UserService,
  UserController,
} from "../modules/user/index.js";
import {
  ChallengeRepository,
  ChallengeService,
  ChallengeController,
} from "../modules/challenge/index.js";
import {
  SubmissionRepository,
  SubmissionService,
  SubmissionController,
} from "../modules/submission//index.js";

export const userRepository = new UserRepository();
export const userService = new UserService(userRepository);
export const userController = new UserController(userService);

export const authRepository = new AuthRepository(userRepository);
export const authService = new AuthService(authRepository, userRepository);
export const authController = new AuthController(authService);

export const challengeRepository = new ChallengeRepository();
export const challengeService = new ChallengeService(challengeRepository);
export const challengeController = new ChallengeController(challengeService);

export const submissionRepository = new SubmissionRepository();
export const submissionService = new SubmissionService(
  submissionRepository,
  challengeService,
);
export const submissionController = new SubmissionController(submissionService);
