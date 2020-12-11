const express = require("express");
const controllers = require("../controllers/user");
const checkAuth = require("../middlewares/auth");
const router = express.Router();

router.post("/signup", controllers.user_signup);
router.post("/login", controllers.login);
router.get("/get-all-user", checkAuth, controllers.get_all_user);

module.exports = router;
