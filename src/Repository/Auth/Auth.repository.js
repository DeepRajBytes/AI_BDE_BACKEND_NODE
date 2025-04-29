const { queryResults } = require("../../Connections/Database/mysql");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup = async (reqData) => {
  try {
    const { firstName, lastName, email, password, role = "user" } = reqData;

    const checkExistence = await queryResults(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    if (checkExistence.length > 0) {
      return 1;
    }
    const nonHashPass = password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(nonHashPass, salt);
    const query = `
      INSERT INTO users (first_name, last_name, email, password, role)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [firstName, lastName, email, hashedPassword, role];
    const data = await queryResults(query, values);
    return 2;
  } catch (error) {
    throw new Error(error);
  }
};

const signin = async (reqData) => {
  try {
    const { email, password } = reqData;
    const checkExistence = await queryResults(
      `SELECT email,password,first_name,last_name,role FROM users WHERE email = ?`,
      [email]
    );
    if (checkExistence.length === 0) {
      return 1;
    }
    const {
      email: grabbedEmail,
      password: grabbedPassword,
      first_name: firstName,
      last_name: lastName,
      role: role,
    } = checkExistence[0];

    const result = await bcrypt.compare(password, grabbedPassword);
    let response = {};
    if (!result) {
      return 2;
    } else {
      let jwtSecretKey = process.env.JWT_SECRET_KEY;
      console.log("jwtSecretKey", jwtSecretKey);
      let data = {
        time: Date(),
        email: grabbedEmail,
        firstName: firstName,
        lastName: lastName,
        role: role,
      };
      const token = JWT.sign(data, jwtSecretKey, { expiresIn: "7d" });
      if (role === "admin") {
        response = { token: token, data: data, adminAccess: true };
      } else {
        response = { token: token, data: data, adminAccess: false };
      }
    }
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const TokenVerify = async (email) => {
  try {
    const checkExistence = await queryResults(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    if (checkExistence.length === 0) {
      return 1;
    }
    return {
      time: Date(),
      email: checkExistence[0].email,
      firstName: checkExistence[0].first_name,
      lastName: checkExistence[0].last_name,
      role: checkExistence[0].role,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { signup, signin, TokenVerify };
