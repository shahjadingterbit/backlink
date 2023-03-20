const { verifyJWT, errorHandler, setTenantDb } = require("./middleware/");
const {
  role,
  user,
  auth,
  backlink,
  domain,
  group,
  groupAssignedBacklink,
  domainAssignedGroup,
  domainAssignedToUser,
  linkBuilderTask,
  refresh,
} = require("./routes/");

module.exports = function (app) {
  app.use(setTenantDb);
  app.use("/api/auth", auth);
  app.use("/api/refresh", refresh); // refresh token
  app.use("/api/backlinks", backlink);
  app.use("/api/domains", domain);
  app.use("/api/groups", group);
  app.use("/api/groupAssignedBacklink", groupAssignedBacklink);
  app.use("/api/domainAssignedGroup", domainAssignedGroup);
  app.use("/api/domainAssignedToUser", domainAssignedToUser);
  app.use("/api/linkbuilderTask", linkBuilderTask);
  // app.use(verifyJWT);
  app.use("/api/roles", role);
  app.use("/api/users", user);
  app.use(errorHandler);
};
