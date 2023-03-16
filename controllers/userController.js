const _ = require("lodash");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const addUser = async (req, res) => {
  try {
    let { name, email, username, password, role_id } = req.body;

    if (!email && !username) {
      return res
        .status(400)
        .send({ status: false, message: "email or username is required" });
    }

    const isDuplicateEmail = await req.masterDb.User.findOne({
      where: { email },
    });

    if (isDuplicateEmail) {
      return res
        .status(400)
        .send({ status: false, message: "Email already exists" });
    }

    const isDuplicateUsername = await req.masterDb.User.findOne({
      where: { username },
    });
    if (isDuplicateUsername) {
      return res
        .status(400)
        .send({ status: false, message: "Username already exists" });
    }

    const role = await req.masterDb.Role.findByPk(role_id);

    if (_.isEmpty(role)) {
      return res
        .status(400)
        .send({ status: false, message: "role_id is invalid" });
    }

    const salt = await bcrypt.genSalt(10);

    const user = await req.masterDb.User.create({
      name,
      email,
      username,
      password: await bcrypt.hash(password, salt),
      role_id,
    });
    const newUser = await req.masterDb.User.findOne({
      where: { id: user.id },
      raw: true,
    });
    delete newUser.password;
    newUser["role_id"] = role;
    return res.status(201).send(newUser);
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};
// ==================================================== edit user API ================================================================

const updateUser = async (req, res) => {
  try {
    const { id, name, email, password, role_id } = req.body;

    let data = {};

    if (role_id) {
      role = await req.masterDb.Role.findByPk(parseInt(role_id));
      if (_.isEmpty(role)) {
        return res
          .status(400)
          .send({ status: false, message: "role_id is invalid" });
      }

      data.role_id = role_id;
    }

    if (name) {
      data.name = name;
    }

    if (email) {
      const isDuplicate = await req.masterDb.User.findOne({
        where: { email, id: { [Op.ne]: id } },
      });
      if (isDuplicate) {
        return res
          .status(400)
          .send({ status: false, message: "Email already exists" });
      }
      data.email = email;
    }

    // if (req.user.role_id.name == "SUPER ADMINISTRATOR" && password) {
    //   const salt = await bcrypt.genSalt(10);
    //   let userPassword = await bcrypt.hash(password, salt);
    //   data.password = userPassword;
    // }
    const user = await req.masterDb.User.update(data, {
      where: { id },
    });
    if (_.isEmpty(user)) {
      return res.status(400).send({ status: false, message: "User not found" });
    }
    let updatedUser = {};
    const getUser = await req.masterDb.User.findOne({
      where: {
        id,
      },
      raw: true,
    });
    updatedUser = getUser;
    delete updatedUser.password;
    const roleDetails = await req.masterDb.Role.findByPk(updatedUser.role_id);
    const updatedUserRole = { ...updatedUser, role_id: roleDetails };
    const updatedUserDetails = {
      ...updatedUserRole,
    };
    return res.status(200).send(updatedUserDetails);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await req.masterDb.User.findAll();
    for (let user of users) {
      const role = await req.masterDb.Role.findByPk(user.role_id, {
        raw: true,
      });
      user["role_id"] = role;
      delete user.password;
    }
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};
module.exports = { addUser, updateUser, getUsers };