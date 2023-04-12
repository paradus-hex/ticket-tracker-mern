import { Router } from 'express';
import ticketController from '../controllers/ticket.controller';

const router = Router();

// Separate routes for better readability
router.route('/')
  .get(ticketController.getAll)
  .post(ticketController.createTicket)
  .put(ticketController.updateTicket)
  .delete(ticketController.unAssignUser);

router.route('/:ticketId')
  .get(ticketController.getTicket)
  .delete(ticketController.deleteTicket)
  .post(ticketController.assignUsers);

router.route('/project/:projectId') //'/project' to avoid conflicts with ticketId route
  .get(ticketController.getProjectTickets);

router.route('/:ticketId/comment/:userId') // '/comment' to avoid conflicts and 
  .post(ticketController.addComment)
  .delete(ticketController.deleteComment)
  .put(ticketController.editComment);

export default router;
