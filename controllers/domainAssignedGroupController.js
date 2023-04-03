const _ = require("lodash");
const domainAssignedGroupList = async (req, res) => {
  try {
    const domain_id = req.params.id;
    let results = [];

    const domain = await req.masterDb.CMSProcessedDomain.findByPk(domain_id);
    if (_.isEmpty(domain)) {
      return res
        .status(400)
        .send({ status: false, message: "domain is invalid" });
    }
    const domainAssignedGroupData =
      await req.masterDb.domainAssignedGroup.findOne({
        where: { domain_id },
        raw: true,
      });
    if (_.isEmpty(domainAssignedGroupData)) {
      return res
        .status(400)
        .send({ status: false, message: "No group assingd to this domain" });
    }
    let GroupRowData = await req.masterDb.Group.findAll({
      where: {
        id: JSON.parse("[" + domainAssignedGroupData.group_ids + "]"),
      },
    });
    for (const rowData of GroupRowData) {
      results.push({
        group_id: rowData.id,
        group_name: rowData.group_name,
      });
    }
    return res.status(200).json(results);
  } catch (err) {
    console.log(
      "🚀 ~ file: domainAssignedGroupController.js:15 ~ group ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};
const domainListHasGroup = async (req, res) => {
  try {
  
    let results = [];
    let domainName;
    let domainHasAssignGroupList = await req.masterDb.domainAssignedGroup.findAll();
    if (_.isEmpty(domainHasAssignGroupList)) {
      return res.status(400).send({
        status: false,
        message: "There is no domain which assigned Group",
      });
    }
    for (const rowData of domainHasAssignGroupList) {
      domainName = await req.masterDb.CMSProcessedDomain.findByPk(rowData.domain_id);
      results.push({
        domain_id: rowData.domain_id,
        domain: domainName.domain,
      });
    }
    return res.status(200).json(results);
  } catch (err) {
    console.log(
      "🚀 ~ file: domainAssignedGroupController.js:15 ~ group ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};
const assignGroupToDomain = async (req, res) => {
  try {
    let { domain_id, group_ids } = req.body;

    if (_.isEmpty(domain_id) || _.isEmpty(group_ids)) {
      return res.sendStatus(400);
    }

    const domain = await req.masterDb.CMSProcessedDomain.findByPk(domain_id);
    if (_.isEmpty(domain)) {
      return res
        .status(400)
        .send({ status: false, message: "domain is invalid" });
    }

    const isDomainExisForTheseDomains = await req.masterDb.domainAssignedGroup.findOne({
      where: { domain_id },
    });

    if (!_.isEmpty(isDomainExisForTheseDomains)) {
      await req.masterDb.domainAssignedGroup.update(
        { group_ids: group_ids.toString() },
        {
          where: {
            domain_id,
          },
        }
      );
      return res
        .status(200)
        .send({ status: true, message: "updated group to this domain" });
    }
    
    await req.masterDb.domainAssignedGroup.create({
      domain_id,
      group_ids: group_ids.toString(),
    });
    return res
      .status(201)
      .send({ status: true, message: "Group assigned to this domain" });
  } catch (err) {
    console.log(
      "🚀 ~ file: domainAssignedGroup.js:15 ~ groupList ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};

const updateGroupFromDomain = async (req, res) => {
  try {
    let { domain_id, group_ids } = req.body;
    if (_.isEmpty(domain_id) || _.isEmpty(group_ids)) {
      return res.sendStatus(400);
    }
    const domain = await req.masterDb.CMSProcessedDomain.findByPk(domain_id);
    if (_.isEmpty(domain)) {
      return res
        .status(400)
        .send({ status: false, message: "domain is invalid" });
    }
    const domainAssignedGroupData =
      await req.masterDb.domainAssignedGroup.findOne({
        where: { domain_id },
        raw: true,
      });
    if (_.isEmpty(domainAssignedGroupData)) {
      return res
        .status(400)
        .send({ status: false, message: "No group assingd to this domain" });
    }
    await req.masterDb.domainAssignedGroup.update(
      { group_ids: group_ids.toString() },
      {
        where: {
          domain_id,
        },
      }
    );
    return res
      .status(200)
      .send({ status: true, message: "updated group to this domain" });
  } catch (err) {
    console.log(
      "🚀 ~ file: domainAssignedGroup.js:193 ~ updateDomain ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};

const deleteGroupFromDomain = async (req, res) => {
  try {
    const domain_id = req.params.domain_id;
    if (_.isEmpty(domain_id)) {
      return res.sendStatus(400);
    }
    const domain = await req.masterDb.CMSProcessedDomain.findByPk(domain_id);

    if (_.isEmpty(domain)) {
      return res
        .status(400)
        .send({ status: false, message: "domain is invalid" });
    }
    const data = await req.masterDb.domainAssignedGroup.destroy({
      where: { domain_id },
    });

    if (data) {
      return res
        .status(200)
        .send({
          status: true,
          message: "group assigned domain deleted successfully",
        });
    } else {
      return res.status(400).json("Invalid request");
    }
  } catch (err) {
    console.log(
      "🚀 ~ file: domainAssignedGroup.js:221 ~ deleteGroup ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};

module.exports = {
  domainAssignedGroupList,
  assignGroupToDomain,
  updateGroupFromDomain,
  deleteGroupFromDomain,
  domainListHasGroup,
};
