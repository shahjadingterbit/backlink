const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");
router.route("/").get(roleController.roleList);
router.route("/addRole").post(roleController.addRole);
router.route("/updateRole").put(roleController.updateRole);
module.exports = router;
