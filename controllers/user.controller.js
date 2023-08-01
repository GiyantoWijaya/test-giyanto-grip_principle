const { User } = require("../models");
const {
  success,
  encrypt,
  error,
  authentication,
  findUser,
  createToken,
} = require("../utils/utils");

exports.index = async (req, res) => {
  const users = await User.findAll();
  return success(res, 200, "Data All Users", users);
};

exports.create = async (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: encrypt(req.body.password),
  };
  try {
    const user = await User.create(data);
    return success(res, 200, "Registration Success, Please Login!", {
      user,
    });
    console.log(data);
  } catch (err) {
    console.log(err);
    return error(res, 400, err.message, {});
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if ((await authentication(email, password)) == true) {
      const user = await findUser(email);
      const token = createToken(user.id);
      const maxAge = 3 * 24 * 60 * 60;
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      await User.update(
        { token: token },
        {
          where: {
            email: user.email,
          },
        }
      );
      return success(res, 200, "Login success", {
        token,
      });
    } else {
      return error(res, 400, "Wrong Email or Password!", {});
    }
  } catch (err) {
    console.log(err);
    return error(res, 400, err.message, {});
  }
};

exports.updatePassword = async (req, res) => {
  const token = req.cookies.jwt;
  const newPassword = encrypt(req.body.password);
  const user = await User.findOne({ where: { token: token } });
  try {
    if (user) {
      const updatedPassword = await User.update(
        { password: newPassword },
        {
          where: {
            email: user.email,
          },
        }
      );
      return success(res, 200, "Update Password successfuly", {});
    } else {
      return error(res, 400, "Please Login First", {});
    }
  } catch (error) {
    console.log(error);
  }
};

exports.logout = async (req, res) => {
  const token = req.cookies.jwt;
  const user = await User.findOne({ where: { token: token } });
  try {
    if (user) {
      const deleteToken = await User.update(
        { token: "" },
        {
          where: {
            email: user.email,
          },
        }
      );
      req.session.destroy;
      res.cookie("jwt", "", { maxAge: 1 });
      return success(res, 200, "Logout successfuly", {});
    } else {
      return error(res, 400, "Please Login First", {});
    }
  } catch (error) {
    return error(res, 400, error.message, {});
  }
};
