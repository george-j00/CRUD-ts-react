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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let accessToken = req.header("Authorization");
    if (!accessToken) {
        return res.status(403).json({ message: "Access Denied" });
    }
    if (accessToken.startsWith("Bearer ")) {
        accessToken = accessToken.slice(7, accessToken.length).trimLeft();
    }
    try {
        // Verify the access accessToken
        const decodedToken = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
        console.log("Verified user");
    }
    catch (error) {
        return res.status(401).json({ message: "Token Expired" });
    }
});
exports.default = isAuthenticated;
