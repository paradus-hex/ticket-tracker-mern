import { Router } from 'express';
import ticketController from '../controllers/ticket.controller';
import authorization from '../middlewares/authorization';
const router = Router();

router.route('/').get(ticketController.getAll);

router
  .route('/:ticketId')
  .get(ticketController.getTicket)
  .delete(authorization, ticketController.deleteTicket);

router.route('/:projectId/:ticketId').put(authorization, ticketController.updateTicket);
router.route('/:projectId').get(ticketController.getProjectTickets).post(authorization, ticketController.createTicket);

export default router;
