const {
  signup,
  signin,
  TokenVerify,
} = require("../../Repository/Auth/Auth.repository");

const signupUser = async (req, res) => {
  console.log("hhiiiiiiiiiieeeeeeeeeeeeesssssffc")
  try {
    const reqData = req.body;
    const SignUpResponse = await signup(reqData);
    if (SignUpResponse === 2) {
      res
        .status(200)
        .json({ data: "USER_SUCCESSFULL_CREATE", status: 200, success: true });
    } else {
      res
        .status(409)
        .json({ data: "USER_ALREADY_PRESENT", status: 409, success: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, status: 500, success: false });
  }
};

const signinUser = async (req, res) => {
  try {
    const reqData = req.body;
    const SignUpResponse = await signin(reqData);
    if (SignUpResponse === 2) {
      res
        .status(200)
        .json({ data: "INCORRECT_PASSWORD", status: 409, success: false });
    } else if (SignUpResponse === 1) {
      res
        .status(409)
        .json({ data: "USER_NOT_PRESENT", status: 409, success: false });
    } else {
      res
        .status(409)
        .json({ data: SignUpResponse, status: 200, success: true });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, status: 500, success: false });
  }
};

const verifyToken = async (req, res) => {
  try {
    const email = req.email;
    const SignUpResponse = await TokenVerify(email);
    if (SignUpResponse === 1) {
      res
        .status(200)
        .json({ data: "INVALID_USER", status: 409, success: false });
    } else {
      res
        .status(409)
        .json({ data: SignUpResponse, status: 200, success: true });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, status: 500, success: false });
  }
};

module.exports = { signupUser, signinUser, verifyToken };
