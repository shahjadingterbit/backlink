const _ = require("lodash");
const addWorkForBacklink = async (req, res) => {
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
module.exports = { addWorkForBacklink };
