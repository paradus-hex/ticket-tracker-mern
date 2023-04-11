import TicketModel from "../models/ticket.model";
import { Request, Response } from "express";

const ticketController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const ticket = await TicketModel.getAll();
      // res.status(200).json({ count: ticket.length, ticket });
      res.status(200).json(ticket);
    } catch (err: any) {
      console.log('getTicket query error: ', err);
      res.status(500).json({ msg: 'Unable to get tickets from database' });
    }
  },

  getTicket: async (req: Request, res: Response) => {
    try {
      const { ticketId } = req.params;
      const ticket = await TicketModel.getTicket(ticketId);
      res.status(200).json(ticket);
    } catch (err) {
      console.log('getTicketById query error: ', err);
      res.status(500).json({ msg: 'Unable to get ticket from database' });
    }
  },

  getProjectTickets: async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
      const ticket = await TicketModel.getProjectTickets(projectId);

      res.status(200).json({ ticket });
    } catch (err) {
      console.log('getProjectId query error: ', err);
      res.status(500).json({ msg: 'Unable to get ticket from database' });
    }
  },

  createTicket: async (req: Request, res: Response) => {
    try {
      let { title, description, projectId } = req.body;
      const ticket = await TicketModel.createTicket(title, description, projectId)

      res.status(201).json({ status: 'Ticket Created!', ticket });
    } catch (err) {
      console.log('createTicket query error: ', err);
      res.status(500).json({ msg: 'Unable to create ticket' });
    }
  },

  updateTicket: async (req: Request, res: Response) => {
    try {
      //* OLD
      // let { ticket_id, title, description, status, author_id, created_at, project_id } = req.body;
      // let ticket = new Ticket(ticket_id, title, description, status, author_id, created_at, project_id);
      //* OLD

      let { ticketId } = req.params;
      let { title, description, status, created_at } = req.body;
      console.log(req.body);
      let ticket = await TicketModel.updateTicket(
        ticketId,
        title,
        description,
        status,
        // author_id,
        // project_id
      );

      // ticket = await ticket.updateTicket();
      // [ticket] = await TicketModel.getTicket(ticketId);

      res.status(201).json({
        status: 'Ticket updated!',
        msg: `Ticket named ${title} updated successfully`
      });
    } catch (err) {
      console.log('createTicket query error: ', err);
      res.status(500).json({ msg: 'Unable to create ticket' });
    }
  },

  deleteTicket: async (req: Request, res: Response) => {
    try {
      let { projectId } = req.params;
      let { ticket_id } = req.body;

      let ticket = await TicketModel.deleteTicket(ticket_id);

      res.status(201).json({
        status: 'Ticket deleted!',
        msg: `Ticket named ${ticket_id} deleted successfully`
      });
    } catch (err) {
      console.log('deleteTicket query error: ', err);
      res.status(500).json({ msg: 'Unable to delete ticket' });
    }
  }
};

export default ticketController;
