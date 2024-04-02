import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository.js";

export default class AuthService {
  async register({ name, email, password }) {
    const user = await UserRepository.getUserByEmail(email);
    if (user) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserRepository.insert({
      name,
      email,
      password: hashedPassword,
    });
    return newUser;
  }

  async login(email, password) {
    const user = await UserRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return { user, token };
  }

  async verifyToken(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserRepository.getUserByEmail(decoded.email);
    return user;
  }
}
