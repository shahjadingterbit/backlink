const express = require("express");
const router = express.Router();
const DomainController = require("../controllers/DomainController");
router.route("/").get(DomainController.domainList);
router.route("/:domainId").get(DomainController.singleDomainDetail);
module.exports = router;
