const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");
router.route("/").get(groupController.groupList);
router.route("/addgroup").post(groupController.addGroup);
router.route("/:id").get(groupController.editGroup);
router.route("/updategroup").put(groupController.updateGroup);
router.delete("/:id",groupController.deleteGroup);
module.exports = router;
