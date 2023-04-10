"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
function jwtGenerator(user_id) {
    const payload = {
        user: user_id
    };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET
    // { expiresIn: "1hr" }
    );
}
exports.default = jwtGenerator;
