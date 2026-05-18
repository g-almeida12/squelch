import AuthController from "../controllers/auth.controller.js";
import AuthRepository from "../repositories/auth.repository.js";
import UserRepository from "../repositories/user.repository.js";
import AuthService from "../services/auth.service.js";
import UserService from "../services/user.services.js";
import UserController from "../controllers/user.controller.js";

export const userRepository = new UserRepository();
export const userService = new UserService(userRepository);
export const userController = new UserController(userService);

export const authRepository = new AuthRepository();
export const authService = new AuthService(authRepository, userRepository);
export const authController = new AuthController(authService);