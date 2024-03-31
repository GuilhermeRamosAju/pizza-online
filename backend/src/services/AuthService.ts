const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import UserRepository from "../repositories/UserRepository";

interface AuhtServiceDTO {
  name: string;
  email: string;
  password: string;
}

export default class AuthService {
  public static async register({ name, email, password }: AuhtServiceDTO) {
    const user = await UserRepository.getUserByEmail(email);
    if (user) {
      throw new Error("User already exists");
    }
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const newUser = await UserRepository.insert({
      name,
      email,
      password: hashedPassword,
    });
    return newUser;
  }

  public static async login(email: string, password: string) {
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

  async verifyToken(token: string) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserRepository.getUserByEmail(decoded.email);
    return user;
  }
}
