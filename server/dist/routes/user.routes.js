"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const multer_1 = __importDefault(require("../services/multer"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
router.post("/api/user/signup", user_controller_1.default.signUp);
router.post("/api/user/login", user_controller_1.default.login);
router.post("/api/user/edit-profile/:userId", authMiddleware_1.default, multer_1.default.single('image'), user_controller_1.default.editProfile);
exports.default = router;
