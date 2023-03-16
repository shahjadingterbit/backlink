const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.sendStatus(403); //invalid token

      const accessToken = await req.masterDb.UserToken.findOne({
        where: { user_id: decoded.id, type: "AccessToken" },
      });

      if (!accessToken) return res.sendStatus(403); //invalid token

      req.user = {
        id: decoded.id,
        username: decoded.username,
      };

      const user = await req.masterDb.User.findOne({
        where: { id: req.user.id },
      });

      user.role = await req.masterDb.Role.findByPk(user.role_id, {
        attributes: ["name", "level"],
      });
      req.user.role_id = user.role;

      next();
    });
  } catch (ex) {
    return res.sendStatus(403); //invalid token
  }
};
