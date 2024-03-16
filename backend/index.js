const express = require("express");
const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(8081, () => {
  console.log("Server listening on port 3001");
});
