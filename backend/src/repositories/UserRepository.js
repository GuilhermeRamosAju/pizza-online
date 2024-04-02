import { v4 as uuidv4 } from "uuid";
import db from "../database/index.js";

class UserRepository {
  constructor() {
    this.db = db;
  }

  async insert(user) {
    const id = uuidv4();
    await this.db.none(
      "INSERT INTO users(id, name, email, password) VALUES($1, $2, $3, $4)",
      [id, user.name, user.email, user.password]
    );
  }

  async getUserByEmail(email) {
    const user = await this.db.oneOrNone(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    return user;
  }
}

export default new UserRepository();
