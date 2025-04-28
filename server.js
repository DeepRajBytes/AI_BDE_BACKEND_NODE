const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRoute = require("./src/Router/Auth/Auth.route");
require("dotenv").config();
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json({ limit: "100mb" }));
app.use(cors());


app.use("/api", AuthRoute);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
