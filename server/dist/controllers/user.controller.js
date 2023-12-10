"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_schema_1 = __importDefault(require("../modals/user.schema"));
const cloudinary_1 = __importDefault(require("../services/cloudinary"));
const saltRounds = 10;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const existingUser = yield user_schema_1.default.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "Email already exists" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const user = new user_schema_1.default({
            name,
            email,
            hashedPassword,
        });
        yield user.save();
        console.log("Successfully added user");
        return res.status(201).json({ message: "User created successfully" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error while creating user" });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existingUser = yield user_schema_1.default.findOne({ email: email });
        if (!existingUser) {
            return res.status(409).json({ error: "Create Account" });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, existingUser.hashedPassword);
        if (passwordMatch) {
            const payload = {
                email: existingUser.email,
            };
            const secretKey = process.env.JWT_SECRET;
            if (!secretKey) {
                throw new Error("JWT_SECRET not found in environment variables");
            }
            const accessToken = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: "15m" });
            // console.log('access token' , accessToken);
            return res.status(201).json({
                message: "Login successfully",
                token: accessToken,
                user: existingUser,
            });
        }
        else {
            return res.status(409).json({ error: "Invalid password" });
        }
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error while Login " });
    }
});
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, userId } = req.body;
    const updatedUserData = {
        name,
        email,
    };
    console.log(updatedUserData);
    if (req.file && req.file.path !== undefined) {
        try {
            const result = yield cloudinary_1.default.v2.uploader.upload(req.file.path);
            if (result) {
                updatedUserData.profilePicture = {
                    secure_url: result.secure_url,
                    cloudinary_id: result.public_id,
                };
            }
        }
        catch (error) {
            console.error("Error uploading file to Cloudinary:", error);
            // Handle the error
        }
    }
    try {
        const updatedUser = yield user_schema_1.default.findOneAndUpdate({ _id: userId }, updatedUserData, { new: true } // To return the updated user
        );
        if (updatedUser) {
            return res.json({
                message: "Profile updated successfully",
                user: updatedUser,
            });
        }
        else {
            return res.status(404).json({ error: "User not found" });
        }
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: "An error occurred while updating the profile" });
    }
});
exports.default = {
    signUp,
    login,
    editProfile
};
