const _ = require("lodash");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const masterDBCon = require("../config/database");

module.exports = async function (req, res, next) {
  try {
    let masterDb = await masterDBCon.Connect();
    req.masterDb = masterDb;

    req.masterDb.Role =
    require("../models/role.model")(
      masterDb,
      Sequelize
    );
    req.masterDb.User =
    require("../models/user.model")(
      masterDb,
      Sequelize
    );
    req.masterDb.Backlink =
    require("../models/backlink.model")(
      masterDb,
      Sequelize
    );
    req.masterDb.Group =
    require("../models/group.model")(
      masterDb,
      Sequelize
    );
    req.masterDb.groupAssignedBacklink =
    require("../models/groupAssignedBacklink.model")(
      masterDb,
      Sequelize
    );
    req.masterDb.domainAssignedGroup =
    require("../models/domainAssignedGroup.model")(
      masterDb,
      Sequelize
    );
    req.masterDb.domainAssignedToUser =
    require("../models/domainAssignedToUser.model")(
      masterDb,
      Sequelize
    );
    
    req.masterDb.UserToken =
    require("../models/userToken.model")(
      masterDb,
      Sequelize
    );

    req.masterDb.LinkBuilderTask =
    require("../models/linkBuilderTask.model")(
      masterDb,
      Sequelize
    );

    next();
  } catch (ex) {
    console.log("🚀 ~ file: setTenantDb.js:11 ~ ex", ex);
    return res.sendStatus(403); //invalid token
  }
};