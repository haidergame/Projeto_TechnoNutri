const express = require("express");
const UserController = require("../controllers/UserController");

const router = express.Router();

router.get("/", UserController.getUsers);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/users", UserController.getUsers);

module.exports = router;