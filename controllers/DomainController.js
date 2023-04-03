const _ = require("lodash");
const { QueryTypes } = require("sequelize");
const masterDBCon = require("../config/database");
const domainList = async (req, res) => {
  try {
    let masterDb = await masterDBCon.Connect2();
    const domainListData = await masterDb.query(
      `SELECT * FROM cms_processed_domains`,
      {
        type: QueryTypes.SELECT,
      }
    );
    if (_.isEmpty(domainListData)) {
      return res
        .status(400)
        .send({ status: false, message: "There is no domainLinkList" });
    }
    return res.status(200).json(domainListData);
  } catch (err) {
    console.log(
      "🚀 ~ file: domainController.js:15 ~ domainLinkList ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};

const singleDomainDetail = async (req, res) => {
  try {
    const domainId = req.params.domainId;
    let masterDb = await masterDBCon.Connect2();
    const domainData = await masterDb.query(
      `SELECT * FROM cms_processed_domains WHERE id = '${domainId}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    if (_.isEmpty(domainData)) {
      return res
        .status(400)
        .send({ status: false, message: "There is no domainData" });
    }
    return res.status(200).json(domainData);
  } catch (err) {
    console.log(
      "🚀 ~ file: domainController.js:15 ~ domainLinkList ~ err",
      err.message
    );
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    throw new Error(err.message);
  }
};


module.exports = {
  domainList,
  singleDomainDetail,
};
