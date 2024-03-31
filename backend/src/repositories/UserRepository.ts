import User from "../entities/User";
import { v4 as uuidv4 } from "uuid";
const db = require("../database/db.js");

class UserRepository {
  private db: any;
  constructor() {
    this.db = db;
  }

  public async insert(user: Partial<User>) {
    const id = uuidv4();
    await this.db.none(
      "INSERT INTO users(id, name, email, password) VALUES($1, $2, $3, $4)",
      [id, user.name, user.email, user.password]
    );
  }

  public async getUserByEmail(email: string) {
    const user = await this.db.oneOrNone(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    return user;
  }
}

export default new UserRepository();
