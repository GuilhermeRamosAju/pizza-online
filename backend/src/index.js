import express from "express";
import db from "./database/index.js";
import routes from "./routes.js";

const app = express();
app.use(routes);
const PORT = 3333;

app.listen(PORT, () => console.log("Server is running on port 3333"));
