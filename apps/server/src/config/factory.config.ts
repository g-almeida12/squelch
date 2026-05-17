import AuthController from "../controllers/auth.controller.js";
import AuthRepository from "../repositories/auth.repository.js";
import AuthService from "../services/auth.service.js";

export const authRepository = new AuthRepository();
export const authService = new AuthService(authRepository, );
export const authController = new AuthController(authService);