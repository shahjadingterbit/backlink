const _ = require("lodash");

const reportListOfBacklinks = async (req, res) => {
  try {
    let { user_id, domain_id, group_id } = req.body;
    let results = [];
    if (_.isEmpty(user_id) || _.isEmpty(domain_id) || _.isEmpty(group_id)) {
      return res.status(400).send({
        status: false,
        message: "Please fill user_id, domain_id, group_id",
      });
    }
    const isUserExist = await req.masterDb.User.findOne({
      where: { id: user_id },
    });
    if (_.isEmpty(isUserExist)) {
      return res
        .status(400)
        .send({ status: false, message: "User_id is invalid" });
    }
    const isDomainExist = await req.masterDb.CMSProcessedDomain.findOne({
      where: { id: domain_id },
    });
    if (_.isEmpty(isDomainExist)) {
      return res
        .status(400)
        .send({ status: false, message: "domain_id is invalid" });
    }

    const isGroupExist = await req.masterDb.Group.findOne({
      where: { id: group_id },
    });
    if (_.isEmpty(isGroupExist)) {
      return res
        .status(400)
        .send({ status: false, message: "group_id is invalid" });
    }

    let reportOfbacklinkRowData = await req.masterDb.LinkBuilderTask.findAll({
      where: {
        user_id,
        domain_id,
        group_id,
      },
    });
    for (const rowData of reportOfbacklinkRowData) {
      results.push({
        username: rowData.username,
        password: rowData.password,
        ancor_text: rowData.ancor_text,
        description: rowData.description,
        live_link: rowData.live_link,
        status: rowData.status,
      });
    }
    return res.status(200).json(results);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};
const createReportForBacklink = async (req, res) => {
  try {
    let {
      user_id,
      domain_id,
      group_id,
      backlink_domain_id,
      username,
      password,
      ancor_text,
      description,
      live_link,
      status,
    } = req.body;

    if (
      _.isEmpty(user_id) ||
      _.isEmpty(domain_id) ||
      _.isEmpty(group_id) ||
      _.isEmpty(backlink_domain_id) ||
      _.isEmpty(username) ||
      _.isEmpty(password) ||
      _.isEmpty(ancor_text) ||
      _.isEmpty(description) ||
      _.isEmpty(live_link) ||
      _.isEmpty(status)
    ) {
      return res
        .status(400)
        .send({ status: false, message: "Please filled all feild" });
    }
    const isUsernameExist = await req.masterDb.User.findOne({
      where: { id: user_id },
    });
    if (_.isEmpty(isUsernameExist)) {
      return res
        .status(400)
        .send({ status: false, message: "Username does not exists" });
    }

    const domain = await req.masterDb.CMSProcessedDomain.findByPk(domain_id);

    if (_.isEmpty(domain)) {
      return res
        .status(400)
        .send({ status: false, message: "domain id is invalid" });
    }

    const group = await req.masterDb.Group.findByPk(group_id);

    if (_.isEmpty(group)) {
      return res
        .status(400)
        .send({ status: false, message: "Group is invalid" });
    }

    const backlink = await req.masterDb.Backlink.findByPk(backlink_domain_id);

    if (_.isEmpty(backlink)) {
      return res
        .status(400)
        .send({ status: false, message: "backlink is invalid" });
    }

    const isLinkBuilderTaskExist = await req.masterDb.LinkBuilderTask.findOne({
      where: { user_id, domain_id, group_id, backlink_domain_id },
    });
    if (!_.isEmpty(isLinkBuilderTaskExist)) {
      return res
        .status(400)
        .send({ status: false, message: "Task submitted already" });
    }

    await req.masterDb.LinkBuilderTask.create({
      user_id,
      domain_id,
      group_id,
      backlink_domain_id,
      username,
      password,
      ancor_text,
      description,
      live_link,
      status,
    });

    return res
      .status(201)
      .send({ status: true, message: "Task added successfully" });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};
const updateReportForBacklink = async (req, res) => {
  try {
    let {
      id,
      user_id,
      domain_id,
      group_id,
      backlink_domain_id,
      username,
      password,
      ancor_text,
      description,
      live_link,
      status,
    } = req.body;

    if (
      _.isEmpty(id) ||
      _.isEmpty(user_id) ||
      _.isEmpty(domain_id) ||
      _.isEmpty(group_id) ||
      _.isEmpty(backlink_domain_id) ||
      _.isEmpty(username) ||
      _.isEmpty(password) ||
      _.isEmpty(ancor_text) ||
      _.isEmpty(description) ||
      _.isEmpty(live_link) ||
      _.isEmpty(status)
    ) {
      return res
        .status(400)
        .send({ status: false, message: "Please filled all feild" });
    }

    const isLinkBuilderReportDataExist =
      await req.masterDb.LinkBuilderTask.findOne({
        where: { id },
      });

    if (_.isEmpty(isLinkBuilderReportDataExist)) {
      return res
        .status(400)
        .send({ status: false, message: "Report id is invalid" });
    }

    const isUsernameExist = await req.masterDb.User.findOne({
      where: { id: user_id },
    });
    if (_.isEmpty(isUsernameExist)) {
      return res
        .status(400)
        .send({ status: false, message: "Username does not exists" });
    }

    const domain = await req.masterDb.CMSProcessedDomain.findByPk(domain_id);

    if (_.isEmpty(domain)) {
      return res
        .status(400)
        .send({ status: false, message: "domain id is invalid" });
    }

    const group = await req.masterDb.Group.findByPk(group_id);

    if (_.isEmpty(group)) {
      return res
        .status(400)
        .send({ status: false, message: "Group is invalid" });
    }

    const backlink = await req.masterDb.Backlink.findByPk(backlink_domain_id);

    if (_.isEmpty(backlink)) {
      return res
        .status(400)
        .send({ status: false, message: "backlink is invalid" });
    }

    const isLinkBuilderTaskExist = await req.masterDb.LinkBuilderTask.findOne({
      where: { user_id, domain_id, group_id, backlink_domain_id },
    });
    if (!_.isEmpty(isLinkBuilderTaskExist)) {
      return res
        .status(400)
        .send({ status: false, message: "Task submitted already" });
    }

    await req.masterDb.LinkBuilderTask.update(
      {
        user_id,
        domain_id,
        group_id,
        backlink_domain_id,
        username,
        password,
        ancor_text,
        description,
        live_link,
        status,
      },
      {
        where: {
          id,
        },
      }
    );
    return res
      .status(201)
      .send({ status: true, message: "Report updated successfully" });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};
module.exports = {
  createReportForBacklink,
  updateReportForBacklink,
  reportListOfBacklinks,
};
