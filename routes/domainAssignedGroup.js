const express = require("express");
const router = express.Router();
const domainAssignedGroupController = require("../controllers/domainAssignedGroupController");
router.route("/").get(domainAssignedGroupController.domainAssignedGroupList);
router.route("/assignGroupToDomain").post(domainAssignedGroupController.assignGroupToDomain);
router.route("/updateGroupFromDomain").put(domainAssignedGroupController.updateGroupFromDomain);
router.delete("/:domain_id",domainAssignedGroupController.deleteGroupFromDomain);
module.exports = router;
