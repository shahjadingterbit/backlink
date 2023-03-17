const express = require("express");
const router = express.Router();
const DomainController = require("../controllers/DomainController");
router.route("/").get(DomainController.domainList);
module.exports = router;
