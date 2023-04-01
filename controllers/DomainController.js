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


module.exports = {
  domainList,
};
