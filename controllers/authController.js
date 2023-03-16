const jwt = require("jsonwebtoken");
const _ = require("lodash");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const handleLogin = async (req, res, next) => {
  if (!req.ip) {
    return res.sendStatus(400).json({
      message: "Invalid request",
    });
  }

  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  try {
    let condition = {
      [Op.or]: [{ email: username }, { username: username }],
    };

    let user = await req.masterDb.User.findOne({
      where: condition,
      attributes: ["id", "role_id", "email", "password"],
    });

    if (_.isEmpty(user)) {
      return res.sendStatus(401); //Unauthorized
    }

    user.role = await req.masterDb.Role.findByPk(user.role_id, {
      attributes: ["name", "level"],
    });

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.sendStatus(401);
    }

    // create JWTs
    const accessToken = jwt.sign(
      { id: user.id, username: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACTION_TOKEN_EXPIRES_IN }
    );

    const refreshToken = jwt.sign(
      { id: user.id, username: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
    );

    // save access token into db

    const uAccessToken = {
      user_id: user.id,
      type: "AccessToken",
      token: accessToken,
    };

    await req.masterDb.UserToken.create(uAccessToken);

    const uRefreshToken = {
      user_id: user.id,
      type: "RefreshToken",
      token: refreshToken,
    };

    await req.masterDb.UserToken.create(uRefreshToken);

    user_data = await req.masterDb.User.findByPk(user.id, {
      attributes: ["id", "role_id", "email"],
    });

    let role = await req.masterDb.Role.findByPk(user.role_id, {
      attributes: ["name", "level"],
    });

    user = {
      id: user_data.id,
      role_id: user_data.role_id,
      email: user_data.email,
      role: {
        name: role.name,
        level: role.level,
      },
    };

    return res.status(200).json({ user, accessToken, refreshToken });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = { handleLogin };
