const _ = require("lodash");
const domainAssingedToUserList = async (req, res) => {
  try {
    let { user_id } = req.body;
    if (_.isEmpty(user_id)) {
      return res
        .status(400)
        .send({ status: false, message: "Please fill user id" });
    }
    const isUserExist = await req.masterDb.User.findOne({
      where: { id: user_id },
    });
    if (_.isEmpty(isUserExist)) {
      return res
        .status(400)
        .send({ status: false, message: "User id is invalid" });
    }
    let results = [];
    const domainAssignedToUserData =
      await req.masterDb.domainAssignedToUser.findOne({
        where: { user_id },
        raw: true,
      });
    if (_.isEmpty(domainAssignedToUserData)) {
      return res
        .status(400)
        .send({ status: false, message: "No domain assigned to this user" });
    }
    let domainRowData = await req.masterDb.CMSProcessedDomain.findAll({
      where: {
        id: JSON.parse("[" + domainAssignedToUserData.domain_ids + "]"),
      },
    });
    for (const rowData of domainRowData) {
      results.push({
        domain_id: rowData.id,
        domain: rowData.domain,
      });
    }
    return res.status(200).json(results);
  } catch (err) {
    console.log(
      "🚀 ~ file: domainAssignedToUserControllerController.js:28 ~ group ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};

const addDomainToUser = async (req, res) => {
  try {
    let { user_id, domain_ids } = req.body;
    if (_.isEmpty(user_id) || _.isEmpty(domain_ids)) {
      return res.sendStatus(400);
    }
    const isUserExist = await req.masterDb.User.findOne({
      where: { id: user_id },
    });
    if (_.isEmpty(isUserExist)) {
      return res
        .status(400)
        .send({ status: false, message: "User id is invalid" });
    }

    const isUserExistFortheseDomains = await req.masterDb.domainAssignedToUser.findOne({
      where: { user_id },
    });
    if (!_.isEmpty(isUserExistFortheseDomains)) {
      return res
        .status(400)
        .send({ status: false, message: "User already has domains,so use update API"});
    }
    await req.masterDb.domainAssignedToUser.create({
      user_id,
      domain_ids: domain_ids.toString(),
    });
    return res
      .status(201)
      .send({ status: true, message: "Domains assigned to this user" });
  } catch (err) {
    console.log(
      "🚀 ~ file: domainAssignedToUserController.js:51 ~ domainAssignToUser ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};

const updateDomainToUser = async (req, res) => {
  try {
    let { user_id, domain_ids } = req.body;
    if (_.isEmpty(user_id) || _.isEmpty(domain_ids)) {
      return res.sendStatus(400);
    }
    const isUserExist = await req.masterDb.User.findOne({
      where: { id: user_id },
    });
    if (_.isEmpty(isUserExist)) {
      return res
        .status(400)
        .send({ status: false, message: "User id is invalid" });
    }

    const isUserHasDomain = await req.masterDb.domainAssignedToUser.findOne(
      {
        where: { user_id },
      }
    );
    if (_.isEmpty(isUserHasDomain)) {
      return res
        .status(400)
        .send({ status: false, message: "This User has no backlinks, first assing domain this user" });
    }

    await req.masterDb.domainAssignedToUser.update(
      { domain_ids: domain_ids.toString() },
      {
        where: {
          user_id,
        },
      }
    );
    return res
      .status(200)
      .send({
        status: false,
        message: "Updated domains for this user successfully",
      });
  } catch (err) {
    console.log(
      "🚀 ~ file: domainAssignedToUserController.js:193 ~ updateGroup ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};

const deleteDomainFromUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    if (_.isEmpty(user_id)) {
      return res.sendStatus(400);
    }
    const isUserExist = await req.masterDb.User.findOne({
      where: { id: user_id },
    });
    if (_.isEmpty(isUserExist)) {
      return res
        .status(400)
        .send({ status: false, message: "User does not exists" });
    }
    const data = await req.masterDb.domainAssignedToUser.destroy({
      where: { user_id },
    });

    if (data) {
      return res
        .status(200)
        .send({ status: false, message: "User deleted from domain successfully" });
    } else {
      return res.status(400).json("Invalid request");
    }
  } catch (err) {
    console.log(
      "🚀 ~ file: domainAssignedToUserController.js:110 ~ deleteGroup ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};

module.exports = {
  domainAssingedToUserList,
  addDomainToUser,
  updateDomainToUser,
  deleteDomainFromUser,
};
