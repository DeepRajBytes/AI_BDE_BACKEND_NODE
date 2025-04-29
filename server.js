require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRoute = require("./src/Router/Auth/Auth.route");
const port = process.env.PORT || 3000;
const { setupSwagger } = require("./swagger_setup");

const app = express();

app.use(bodyParser.json({ limit: "100mb" }));
app.use(cors());

setupSwagger(app);

app.use("/api", AuthRoute);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
