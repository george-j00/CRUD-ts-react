const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const isAuthenticated = require("../middlewares/authMiddleware");
const upload = require("../services/multer");
// const multer = require("multer");
// const upload = multer(); 

router.post("/api/user/signup", userController.signUp);
router.post("/api/user/login", userController.login);

router.post("/api/user/edit-profile/:userId", isAuthenticated, upload.single('image') ,userController.editProfile);

module.exports = router;
