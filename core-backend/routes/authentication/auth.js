const { Router } = require("express");
const router = Router();
const logincontroller = require("../../controllers/Authentication/login");
const registercontroller = require("../../controllers/Authentication/register");

// router.get("/auth/admin", controller.getAdmin);
router.post("/auth/admin/register", registercontroller.registerAdmin);
router.post("/auth/admin/login", logincontroller.loginAdmin);

module.exports = router;
