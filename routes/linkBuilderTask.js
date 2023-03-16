const express = require("express");
const router = express.Router();
const linkBuilderTaskController = require("../controllers/linkBuilderTaskController");
router.route("/addWorkForBacklink").post(linkBuilderTaskController.addWorkForBacklink);
module.exports = router;
