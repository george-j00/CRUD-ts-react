const express = require("express");
const router = express.Router();
// const userController = require("../controllers/user.controller");
const adminController = require("../controllers/admin.controller");
// const isAuthenticated = require("../middlewares/authMiddleware");
// const upload = require("../services/multer");

router.get('/all-users' , adminController.getAllUsers);


module.exports = router;
