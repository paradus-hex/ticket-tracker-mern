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
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwtToken = req.header('token');
        console.log(jwtToken);
        if (!jwtToken) {
            return res.status(403).json('No jwt token provide');
        }
        const payload = jsonwebtoken_1.default.verify(jwtToken, process.env.JWT_SECRET);
        ;
        req.user = payload.user;
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(403).json('Not Authorized');
    }
});
