const JWT = require("jsonwebtoken");

const JWTVerify = async (req, res, next) => {
  try {
    const bearerHeader = req.headers?.authorization;
    if (typeof bearerHeader === "undefined") {
      return res.status(401).json({ error: "Authorization token missing" });
    }
    let email;
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      const token = bearerToken;
      email = await getUserIdFromToken(token);
    }
    if (!email) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.email = email;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: " + error.message });
  }
};

const getUserIdFromToken = (token) => {
  try {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const decoded = JWT.verify(token, jwtSecretKey);
    const email = decoded ? decoded.email : null;
    return email;
  } catch (error) {
    return null;
  }
};

module.exports = JWTVerify;
