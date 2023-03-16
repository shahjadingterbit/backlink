const _ = require("lodash");
const { Op } = require("sequelize");

const addRole = async (req, res) => {
  try {
    let { roleName, level } = req.body;

    const role = await req.masterDb.Role.findOne({
      where: {
        name: roleName,
      },
    });

    if (role) {
      return res
        .status(400)
        .send({ status: false, message: "Role already exist" });
    }

    if (level > 10) {
      return res
        .status(400)
        .send({ status: false, message: "Level can not be more then 10" });
    }

    const result = await req.masterDb.Role.create({
      name: roleName,
      level: level,
    });

    const newRole = await req.masterDb.Role.findByPk(result.id);

    return res.status(201).send(newRole);
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const updateRole = async (req, res) => {
  try {
    let { id, roleName, level } = req.body;

    if (level > 10) {
      return res
        .status(400)
        .send({ status: false, mesage: "Level can not be more then 10" });
    }

    let role = await req.masterDb.Role.update(
      {
        name: roleName,
        level: level,
      },
      {
        where: { id },
      }
    );

    if (_.isEmpty(role)) {
      return res.status(400).send({ status: false, message: "Role not found" });
    }

    let affectedCount = role[0];

    let updatedRole = {};

    if (affectedCount > 0) {
      updatedRole = await req.masterDb.Role.findByPk(id);
    }

    return res.status(200).send(updatedRole);
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const roleList = async (req, res) => {
  try {
    // let query = {
    //   level: { [Op.gte]: req.user.role_id.level },
    // };
    const roles = await req.masterDb.Role.findAll();
    return res.status(200).send(roles); 
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};
module.exports = { addRole, updateRole, roleList };
