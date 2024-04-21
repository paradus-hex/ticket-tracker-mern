import { Router } from 'express';
import projectController from '../controllers/project.controller';
import authorization from '../middlewares/authorization.js';

const router = Router();

// Matches route with "/api/v1/projects/"
router
  .route('/')
  .get(projectController.getAll)
  .post(authorization, projectController.createProject);

// ${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/projects/:projectId
router
  .route('/:projectId')
  .get(projectController.getById)
  .put(authorization, projectController.updateProject)
  .delete(authorization, projectController.deleteProject);

export default router;
