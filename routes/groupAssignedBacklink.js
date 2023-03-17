const express = require("express");
const router = express.Router();
const groupAssignedBacklinkController = require("../controllers/groupAssignedBacklinkController");
router.route("/").get(groupAssignedBacklinkController.groupAssignedBacklinkList);
router.route("/assignBacklinkToGroup").post(groupAssignedBacklinkController.assignBacklinkToGroup);
router.route("/updateBacklinkToGroup").put(groupAssignedBacklinkController.updateBacklinkToGroup);
router.route("/groupListHasBacklinks").get(groupAssignedBacklinkController.groupListHasBacklinks);
router.delete("/:group_id",groupAssignedBacklinkController.deleteBacklinkFromGroup);
module.exports = router;
