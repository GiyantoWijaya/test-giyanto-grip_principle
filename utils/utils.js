const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { User } = require("../models");

function success(res, status = 200, message = "", data = {}) {
  res.status(status).json({
    message,
    data,
  });
}

function error(res, status = 400, message = "", data = {}) {
  res.status(status).json({
    error: {
      message,
      data,
    },
  });
}

async function findUser(email) {
  const user = await User.findOne({ where: { email } });
  return user;
}

// encrypt password
function encrypt(password) {
  const result = bcrypt.hashSync(password, saltRounds);
  return result;
}

// authenticator
const maxAge = 3 * 24 * 60 * 60;
function createToken(id) {
  return jwt.sign({ id }, "secret", { expiresIn: maxAge });
}

async function authentication(email, password) {
  const user = await findUser(email);
  if (user) {
    const hasil = await bcrypt.compare(password, user.password);
    return hasil;
  } else {
    console.log("akun tidak di temukan");
  }
}

// middleware for authentication
function auth(req, res, next) {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "secret", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        return error(res, 400, "JWT ERROR", {});
      } else {
        req.session.userId = decodedToken.id;
        next();
      }
    });
  } else {
    return error(res, 400, "Token is not verified, Please Login first!", {});
  }
}

module.exports = {
  findUser,
  encrypt,
  authentication,
  auth,
  createToken,
  success,
  error,
};
