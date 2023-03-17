const role = require("./role");
const user = require("./user");
const auth = require("./auth");
const refresh = require("./refresh");
const backlink = require("./backlink");
const domain = require("./domain");
const group = require("./group");
const groupAssignedBacklink = require("./groupAssignedBacklink");
const domainAssignedGroup = require("./domainAssignedGroup");
const domainAssignedToUser = require("./domainAssignedToUser");
const linkBuilderTask = require("./linkBuilderTask");

module.exports = {
  role,
  user,
  backlink,
  domain,
  group,
  groupAssignedBacklink,
  domainAssignedGroup,
  domainAssignedToUser,
  linkBuilderTask,
  auth,
  refresh,
};
