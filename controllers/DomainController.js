const _ = require("lodash");
const domainList = async (req, res) => {
  try {
    const domainListData = await req.masterDb.CMSProcessedDomain.findAll();
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
