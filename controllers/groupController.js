const _ = require("lodash");
const groupList = async (req, res) => {
  try {
    const groupData = await req.masterDb.Group.findAll();
    if (_.isEmpty(groupData)) {
      return res
        .status(400)
        .send({ status: false, message: "There is no group" });
    }
    return res.status(200).json(groupData);
  } catch (err) {
    console.log("🚀 ~ file: groupController.js:15 ~ group ~ err", err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};

const addGroup = async (req, res) => {
  try {
    let { group_name } = req.body;

    if (_.isEmpty(group_name)) {
      return res
        .status(400)
        .send({ status: false, message: "group_name is required" });
    }
    const groupCheck = await req.masterDb.Group.findOne({
      where: { group_name },
    });
    if (!_.isEmpty(groupCheck)) {
      return res
        .status(400)
        .send({ status: false, message: "This group is already in database" });
    }
    const result = await req.masterDb.Group.create({ group_name });
    return res.status(201).send({ status: true, message: "group added" });
  } catch (err) {
    console.log(
      "🚀 ~ file: groupController.js:15 ~ groupList ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};

const updateGroup = async (req, res) => {
  try {
    let { id, group_name } = req.body;

    if (_.isEmpty(id) || _.isEmpty(group_name)) {
      return res
        .status(400)
        .send({ status: false, message: "id and group_name is required" });
    }
    const isGroupExist = await req.masterDb.Group.findOne({
      where: { id },
    });

    if (_.isEmpty(isGroupExist)) {
      return res
        .status(400)
        .send({ status: false, message: "Group id is invalid" });
    }

    await req.masterDb.Group.update(
      { group_name },
      {
        where: {
          id,
        },
      }
    );
    return res
      .status(200)
      .send({ status: true, message: "Group updated successfully" });
  } catch (err) {
    console.log(
      "🚀 ~ file: groupController.js:193 ~ updateGroup ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};
const editGroup = async (req, res) => {
  try {
    const id = req.params.id;
    if (_.isEmpty(id)) {
      return res.status(400).send({ status: false, message: "id is required" });
    }
    const groupData = await req.masterDb.Group.findOne({
      where: { id },
    });
    if (_.isEmpty(groupData)) {
      return res
        .status(400)
        .send({ status: false, message: "Group id is invalid" });
    }
    return res.status(200).json(groupData);
  } catch (err) {
    console.log(
      "🚀 ~ file: groupController.js:221 ~ deleteGroup ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};
const deleteGroup = async (req, res) => {
  try {
    const id = req.params.id;
    if (_.isEmpty(id)) {
      return res.status(400).send({ status: false, message: "id is required" });
    }

    const isGroupExist = await req.masterDb.Group.findOne({
      where: { id },
    });
    if (_.isEmpty(isGroupExist)) {
      return res
        .status(400)
        .send({ status: false, message: "Group id is invalid" });
    }
    const data = await req.masterDb.Group.destroy({
      where: { id },
    });
    if (data) {
      return res
        .status(400)
        .send({ status: true, message: "Group deleted successfully" });
    } else {
      return res.status(400).json("Invalid request");
    }
  } catch (err) {
    console.log(
      "🚀 ~ file: groupController.js:221 ~ deleteGroup ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};

module.exports = {
  groupList,
  addGroup,
  editGroup,
  updateGroup,
  deleteGroup,
};
