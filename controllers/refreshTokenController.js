const jwt = require("jsonwebtoken");
const _ = require("lodash");

const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.headers.refreshtoken;
    if (!refreshToken) {
      return res
        .status(400)
        .send({ status: false, message: "refresh token is required" });
    }

    const condition = {
      type: "RefreshToken",
      token: refreshToken,
    };

    const foundUser = await req.masterDb.UserToken.findOne({
      where: condition,
      attributes: ["user_id"],
    });

    if (_.isEmpty(foundUser)) return res.sendStatus(403); //Forbidden

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err || parseInt(foundUser.user_id) !== decoded.id) {
          return res.sendStatus(403); //Forbidden
        }

        const condition2 = {
          id: foundUser.user_id,
        };

        const user = await req.masterDb.User.findOne({
          where: condition2,
          attributes: ["id", "username"],
        });

        if (_.isEmpty(user)) {
          return res.sendStatus(401); //Unauthorized
        }

        const accessToken = jwt.sign(
          {
            id: user.id,
            username: user.username,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: process.env.ACTION_TOKEN_EXPIRES_IN }
        );

        if (!accessToken) {
          return res.sendStatus(403); //Forbidden
        }

        const userDetails = {
          username: user.username,
        };

        let updatedAccessToken = {
          token: accessToken,
        };

        await req.masterDb.UserToken.update(updatedAccessToken, {
          where: { type: "AccessToken", user_id: user.id },
        });

        res.json({ userDetails, accessToken });
      }
    );
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  refreshToken,
};
