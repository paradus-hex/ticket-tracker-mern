"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorization_js_1 = __importDefault(require("../middlewares/authorization.js"));
const user_controller_js_1 = __importDefault(require("../controllers/user.controller.js"));
const router = (0, express_1.Router)();
router.post('/login', user_controller_js_1.default.loginUser);
// Matches route with "/api/v1/user/"
router.route('/').get(user_controller_js_1.default.getAll).post(user_controller_js_1.default.addUser);
// Matches route with "/api/v1/user/:id"
router
    .route('/:userId')
    .get(user_controller_js_1.default.getUser)
    .put(authorization_js_1.default, user_controller_js_1.default.updateUser)
    .delete(authorization_js_1.default, user_controller_js_1.default.deleteUser);
exports.default = router;
