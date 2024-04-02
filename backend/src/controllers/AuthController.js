import AuthService from "../services/AuthService.js";

export class AuthController {
  async register(req, res) {
    console.log("register");
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send("Missing fields");
    }
    try {
      await AuthService.register({ name, email, password });
      res.status(201).send("User registered successfully");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Missing fields");
    }
    try {
      const { user, token } = await AuthService.login(email, password);
      res.status(200).send({ user, token });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}
