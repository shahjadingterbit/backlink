const express = require("express");
const router = express.Router();
const domainAssignedToUserController = require("../controllers/domainAssignedToUserController");
router.route("/").get(domainAssignedToUserController.domainAssingedToUserList);
router.route("/addDomainToUser").post(domainAssignedToUserController.addDomainToUser);
router.route("/updateDomainToUser").put(domainAssignedToUserController.updateDomainToUser);
router.delete("/:user_id",domainAssignedToUserController.deleteDomainFromUser);
module.exports = router;
