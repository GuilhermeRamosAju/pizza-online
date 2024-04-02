import { Router } from "express";
import RegisterValidation from "./middlewares/RegisterValidation.js";
import LoginValidation from "./middlewares/LoginValidation.js";
import { AuthController } from "./controllers/AuthController.js";

export default () => {
  const authController = new AuthController();

  const router = Router();

  router.post("/usuarios", RegisterValidation, authController.register);

  router.post("/login", LoginValidation, authController.login);

  return router;
};
