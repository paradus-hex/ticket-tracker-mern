import { Router } from 'express';
import userRoutes from './user.router'
import projectRoutes from './project.router'
import ticketRoutes from './ticket.router'

const RootRouter = Router();

// 3) ROUTES
// router.use('/api/v1/tickets', ticketRouter);
// router.use('/api/v1/users', userRouter);

RootRouter.use('/project', projectRoutes);
RootRouter.use('/user', userRoutes);
RootRouter.use('/ticket', ticketRoutes);
// RootRouter.use('/projectassignments', projectAssignmentsRoutes);
// RootRouter.use('/ticketassignments', ticketAssignmentsRoutes);
// RootRouter.use('/login', loginRoutes);
// RootRouter.use('/availableUsers', availableUsersRoutes);
// RootRouter.use('/auth', authRoutes);

export default RootRouter;
