"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
cloudinary_1.default.v2.config({
    cloud_name: "dyawq6e7r",
    api_key: "844611149398845",
    api_secret: "xn9B4Tmz_x_hYWe6JbwQGZgmJuk",
    secure: true,
});
exports.default = cloudinary_1.default;
