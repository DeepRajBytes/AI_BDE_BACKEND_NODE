const {
  signupUser,
  signinUser,
  verifyToken,
} = require("../../Controller/Auth/Auth.controller");
const JWTVerify = require("../../Middlewear/Authentication");
const { Router } = require("express");

const router = Router();
router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.get("/verifyToken", JWTVerify, verifyToken);

module.exports = router;
