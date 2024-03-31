import pgp from "pg-promise";

const db = pgp()({
  host: "localhost",
  port: 5432,
  database: "pizzaOnline",
  user: "postgres",
  password: "123456",
});

export default db;
