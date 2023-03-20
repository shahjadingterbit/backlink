const express = require("express");
const router = express.Router();
const linkBuilderTaskController = require("../controllers/linkBuilderTaskController");
router.route("/").get(linkBuilderTaskController.reportListOfBacklinks);
router.route("/createReportForBacklink").post(linkBuilderTaskController.createReportForBacklink);
router.route("/updateReportForBacklink").put(linkBuilderTaskController.updateReportForBacklink);
module.exports = router;
