import { Router } from 'express';
import ticketController from '../controllers/ticket.controller';
import authorization from '../middlewares/authorization';
const router = Router();

router.route('/').get(ticketController.getAll).post(ticketController.createTicket).put(ticketController.updateTicket);

router
  .route('/:ticketId')
  .get(ticketController.getTicket)
  .delete(ticketController.deleteTicket);

router.route('/:projectId').get(ticketController.getProjectTickets)

export default router;
