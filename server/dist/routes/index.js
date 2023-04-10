"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_router_1 = __importDefault(require("./user.router"));
const RootRouter = (0, express_1.Router)();
// 3) ROUTES
// router.use('/api/v1/tickets', ticketRouter);
// router.use('/api/v1/users', userRouter);
// RootRouter.use('/projects', projectRoutes);
RootRouter.use('/user', user_router_1.default);
// RootRouter.use('/projectassignments', projectAssignmentsRoutes);
// RootRouter.use('/tickets', ticketRoutes);
// RootRouter.use('/ticketassignments', ticketAssignmentsRoutes);
// RootRouter.use('/login', loginRoutes);
// RootRouter.use('/availableUsers', availableUsersRoutes);
// RootRouter.use('/auth', authRoutes);
exports.default = RootRouter;
