"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fileFilter = (req, file, cb) => {
    let ext = path_1.default.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        // Pass a new Error instance if the file type is not supported
        cb(new Error("File type is not supported"));
        return;
    }
    // Provide null to indicate no error and allow the file
    cb(null, true);
};
exports.default = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({}),
    fileFilter,
});
