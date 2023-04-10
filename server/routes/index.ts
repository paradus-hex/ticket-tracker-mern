import { Router } from 'express';
import userRoutes from './user.router'

const RootRouter = Router();

// 3) ROUTES
// router.use('/api/v1/tickets', ticketRouter);
// router.use('/api/v1/users', userRouter);

// RootRouter.use('/projects', projectRoutes);
RootRouter.use('/user', userRoutes);
// RootRouter.use('/projectassignments', projectAssignmentsRoutes);
// RootRouter.use('/tickets', ticketRoutes);
// RootRouter.use('/ticketassignments', ticketAssignmentsRoutes);
// RootRouter.use('/login', loginRoutes);
// RootRouter.use('/availableUsers', availableUsersRoutes);
// RootRouter.use('/auth', authRoutes);

export default RootRouter;
