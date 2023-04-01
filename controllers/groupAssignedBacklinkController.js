const _ = require("lodash");
const groupAssignedBacklinkList = async (req, res) => {
  try {
    const group_id = req.params.group_id;
    let results = [];
    if (_.isEmpty(group_id)) {
      return res
        .status(400)
        .send({ status: false, message: "Please fill group id" });
    }
    const isGroupExist = await req.masterDb.Group.findOne({
      where: { id: group_id },
    });
    if (_.isEmpty(isGroupExist)) {
      return res
        .status(400)
        .send({ status: false, message: "Group does not exists" });
    }
    const groupAssignedBacklinkData =
      await req.masterDb.groupAssignedBacklink.findOne({
        where: { group_id },
        raw: true,
      });
    if (_.isEmpty(groupAssignedBacklinkData)) {
      return res.status(400).send({
        status: false,
        message: "Backlink is not assigned to this Group",
      });
    }
    let backlinkRowData = await req.masterDb.Backlink.findAll({
      where: {
        id: groupAssignedBacklinkData.backlink_domain_ids.split(","),
      },
    });
    for (const rowData of backlinkRowData) {
      results.push({
        backlink_domain_id: rowData.id,
        backlink_domain: rowData.backlink_domain,
      });
    }
    return res.status(200).json(results);
  } catch (err) {
    console.log(
      "🚀 ~ file: groupAssignedBacklinkController.js:15 ~ group ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};
const groupListHasBacklinks = async (req, res) => {
  try {
    let results = [];
    let groupName;
    const groupAssignedBacklinkData =
      await req.masterDb.groupAssignedBacklink.findAll();
    if (_.isEmpty(groupAssignedBacklinkData)) {
      return res.status(400).send({
        status: false,
        message: "There is no group which assigned backlinks",
      });
    }
    for (const rowData of groupAssignedBacklinkData) {
      groupName = await req.masterDb.Group.findByPk(rowData.group_id);
      results.push({
        group_id: rowData.group_id,
        group_name: groupName.group_name,
      });
    }
    return res.status(200).json(results);
  } catch (err) {
    console.log(
      "🚀 ~ file: groupAssignedBacklinkController.js:72 ~ group ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};
const assignBacklinkToGroup = async (req, res) => {
  try {
    let { group_id, backlink_domain_ids } = req.body;

    if (_.isEmpty(group_id) || _.isEmpty(backlink_domain_ids)) {
      return res.status(400).send({
        status: false,
        message: "group_id and  backlink_domain_ids both are required",
      });
    }
    const isGroupExist = await req.masterDb.Group.findOne({
      where: { id: group_id },
    });
    if (_.isEmpty(isGroupExist)) {
      return res
        .status(400)
        .send({ status: false, message: "Group does not exists" });
    }

    const isGroupHasBacklink = await req.masterDb.groupAssignedBacklink.findOne(
      {
        where: { group_id },
      }
    );
    if (!_.isEmpty(isGroupHasBacklink)) {
      return res
        .status(400)
        .send({ status: false, message: "This Group already has backlinks" });
    }

    await req.masterDb.groupAssignedBacklink.create({
      group_id,
      backlink_domain_ids: backlink_domain_ids.toString(),
    });
    return res
      .status(201)
      .send({ status: true, message: "Backlink assigned to this group" });
  } catch (err) {
    console.log(
      "🚀 ~ file: groupAssignedBacklink.js:15 ~ groupList ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};

const updateBacklinkToGroup = async (req, res) => {
  try {
    let { group_id, backlink_domain_ids } = req.body;

    if (_.isEmpty(group_id) || _.isEmpty(backlink_domain_ids)) {
      return res.status(400).send({
        status: false,
        message: "group_id and  backlink_domain_ids both are required",
      });
    }
    const isGroupExist = await req.masterDb.Group.findOne({
      where: { id: group_id },
    });
    if (_.isEmpty(isGroupExist)) {
      return res
        .status(400)
        .send({ status: false, message: "Group does not exists" });
    }

    const isGroupHasBacklink = await req.masterDb.groupAssignedBacklink.findOne(
      {
        where: { group_id },
      }
    );
    if (_.isEmpty(isGroupHasBacklink)) {
      return res
        .status(400)
        .send({ status: false, message: "group_id is invalid" });
    }

    await req.masterDb.groupAssignedBacklink.update(
      { backlink_domain_ids: backlink_domain_ids.toString() },
      {
        where: {
          group_id,
        },
      }
    );
    return res
      .status(200)
      .send({ status: true, message: "updated backlink to this group" });
  } catch (err) {
    console.log(
      "🚀 ~ file: groupAssignedBacklink.js:193 ~ updateGroup ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};

const deleteBacklinkFromGroup = async (req, res) => {
  try {
    const group_id = req.params.group_id;
    if (_.isEmpty(group_id)) {
      return res
        .status(400)
        .send({ status: false, message: "group_id feild is required" });
    }
    const isGroupExist = await req.masterDb.groupAssignedBacklink.findOne({
      where: { id: group_id },
    });
    if (_.isEmpty(isGroupExist)) {
      return res
        .status(400)
        .send({ status: false, message: "group_id is invalid" });
    }

    const data = await req.masterDb.groupAssignedBacklink.destroy({
      where: { group_id },
    });

    if (data) {
      return res
        .status(200)
        .send({ status: true, message: "backlink assinged group deleted" });
    } else {
      return res.status(400).json("Invalid request");
    }
  } catch (err) {
    console.log(
      "🚀 ~ file: groupAssignedBacklink.js:221 ~ deleteGroup ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};

module.exports = {
  groupAssignedBacklinkList,
  assignBacklinkToGroup,
  updateBacklinkToGroup,
  deleteBacklinkFromGroup,
  groupListHasBacklinks,
};
