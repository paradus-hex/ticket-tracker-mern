import { Router } from 'express';
import ticketController from '../controllers/ticket.controller';
import authorization from '../middlewares/authorization';

const router = Router();


router.route('/')
  .get(ticketController.getAll)
  .post(authorization, ticketController.createTicket)
  .put(authorization, ticketController.updateTicket)
  .delete(authorization, ticketController.unAssignUser);

router.route('/:ticketId')
  .get(ticketController.getTicket)
  .delete(authorization, ticketController.deleteTicket)
  .post(authorization, ticketController.assignUsers);

router.route('/project/:projectId') //'/project' to avoid conflicts with ticketId route
  .get(ticketController.getProjectTickets);

router.route('/:ticketId/comment/:userId') // '/comment' to avoid conflicts and 
  .post(authorization, ticketController.addComment)
  .delete(authorization, ticketController.deleteComment)
  .put(authorization, ticketController.editComment);

export default router;
