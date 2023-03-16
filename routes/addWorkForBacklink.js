const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
router.route("/").get(userController.getUsers);
router.route("/addUser").post(userController.addUser);
router.route("/updateUser").put(userController.updateUser);
module.exports = router;
