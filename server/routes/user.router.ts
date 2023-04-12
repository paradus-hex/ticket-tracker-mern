import { Router } from 'express';
import authorization from '../middlewares/authorization.js';
import userController from '../controllers/user.controller.js';

const router = Router();

router.post('/login', userController.loginUser)

// Matches route with "/api/v1/user/"
router.route('/').get(userController.getAll).post(userController.addUser);

// Matches route with "/api/v1/user/:id"
router
  .route('/:userId')
  .get(userController.getUser)
  .put(authorization, userController.updateUser)
  .delete(authorization, userController.deleteUser)

export default router;
