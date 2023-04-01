const express = require("express");
const router = express.Router();
const backlinkController = require("../controllers/backlinkController");
router.route("/").get(backlinkController.backLinkList);
router.route("/addBacklink").post(backlinkController.addBacklink);
router.route("/:id").get(backlinkController.editBacklink);
router.route("/updateBacklink").put(backlinkController.updateBacklink);
router.delete("/:id",backlinkController.deleteBacklink);
module.exports = router;
