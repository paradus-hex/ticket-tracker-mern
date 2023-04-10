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
const user_model_1 = __importDefault(require("../models/user.model"));
const jwtGenerator_js_1 = __importDefault(require("../utils/jwtGenerator.js"));
const userController = {
    getAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield user_model_1.default.getAll();
            res.status(200).json({ count: users.length, users });
        }
        catch (err) {
            console.log('getAllUsers query error: ', err);
            res.status(500).json({ msg: 'Unable to get users from database' });
        }
    }),
    loginUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            //2. check if user doesn't exist (throw error if not)
            const user = yield user_model_1.default.findByEmail(email);
            if (!user) {
                return res.status(401).send('Email or password is incorrect');
            }
            //3. check if incoming password is correct
            const validPassword = yield bcrypt_1.default.compare(password, user.hashedPassword);
            if (!validPassword) {
                return res.status(401).send('Email or password is incorrect');
            }
            //4. give jwt token
            const token = (0, jwtGenerator_js_1.default)(user.id);
            res.json({
                token,
                role: user.role
            });
        }
        catch (err) {
            console.error(err.message);
        }
    }),
    addUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let { name, email, password } = req.body;
        try {
            //Look if user already exists
            const user = yield user_model_1.default.findByEmail(email);
            if (user) {
                return res.status(401).send('User already exists');
            }
            // password encryption before adding to DB
            const salt = yield bcrypt_1.default.genSalt(1);
            // // Hashed password
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            //Add new user to DB
            let newUser = yield user_model_1.default.createUser(name, email, hashedPassword);
            //Generate Token
            const token = (0, jwtGenerator_js_1.default)(newUser.id);
            res.status(201).json({ message: 'User Created!', token });
        }
        catch (err) {
            console.log(`Failed to add ${name} to the database: `, '\n', err);
            res.status(400).json({ msg: 'Please review user and query' });
        }
    }),
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        try {
            const user = yield user_model_1.default.findById(userId);
            res.status(200).json({ user });
        }
        catch (err) {
            console.log(`Failed to get user ${userId}: `, '\n', err);
            res.status(400).json({ msg: 'Please review user request query' });
        }
    }),
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        const { name, email, role } = req.body;
        try {
            const updatedUser = yield user_model_1.default.updateUserInformation(userId, name, email, role);
            res.status(201).json({ message: 'User updated!', updatedUser });
        }
        catch (err) {
            console.log(`Failed to update user ${userId}: `, '\n', err);
            res.status(400).json({ msg: 'Please review user update query' });
        }
    }),
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        try {
            const deleteUser = yield user_model_1.default.deleteUser(userId);
            res.status(200).json({ msg: `User ${userId} successfully deleted` });
        }
        catch (err) {
            console.log(`Failed to delete user ${userId}: `, '\n', err);
            res.status(500).json({ msg: `Project deletion of ${userId} failed` });
        }
    })
};
exports.default = userController;
