import { Router } from 'express';
import projectController from '../controllers/project.controller';
import authorization from '../middlewares/authorization.js';

const router = Router();

// Matches route with "/api/v1/projects/"
router
  .route('/')
  .get(projectController.getAll)
  .post(authorization, projectController.createProject);

// http://localhost:8000/api/v1/projects/:projectId
router
  .route('/:projectId')
  .get(projectController.getById)
  .put(authorization, projectController.updateProject)
  .delete(authorization, projectController.deleteProject);

export default router;
