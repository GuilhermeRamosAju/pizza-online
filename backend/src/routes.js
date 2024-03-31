import { Router } from "express";
import { AuthController } from "./controllers/AuthController.ts";

export default () => {
  const authController = new AuthController();

  const router = Router();

  router.post("/register", authController.register);

  router.post("/login", authController.login);

  return router;
};
