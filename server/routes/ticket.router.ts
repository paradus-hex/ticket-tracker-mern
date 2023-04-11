import { Router } from 'express';
import ticketController from '../controllers/ticket.controller';
const router = Router();

router.route('/').get(ticketController.getAll).post(ticketController.createTicket).put(ticketController.updateTicket).delete(ticketController.unAssignUser);

router
  .route('/:ticketId')
  .get(ticketController.getTicket)
  .delete(ticketController.deleteTicket).post(ticketController.assignUsers);

router.route('/:projectId').get(ticketController.getProjectTickets)



export default router;
