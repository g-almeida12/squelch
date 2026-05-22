import AuthController from "../controllers/auth.controller.js";
import AuthRepository from "../repositories/auth.repository.js";
import UserRepository from "../repositories/user.repository.js";
import AuthService from "../services/auth.service.js";
import UserService from "../services/user.services.js";
import UserController from "../controllers/user.controller.js";
import ChallengeRepository from "../repositories/challenge.repository.js";
import ChallengeService from "../services/challenge.service.js";
import ChallengeController from "../controllers/challenge.controller.js";

export const userRepository = new UserRepository();
export const userService = new UserService(userRepository);
export const userController = new UserController(userService);

export const authRepository = new AuthRepository(userRepository);
export const authService = new AuthService(authRepository, userRepository);
export const authController = new AuthController(authService);

export const challengeRepository = new ChallengeRepository();
export const challengeService = new ChallengeService(challengeRepository);
export const challengeController = new ChallengeController(challengeService);
