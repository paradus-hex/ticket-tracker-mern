import TicketModel from "../models/ticket.model";
import { Request, Response } from "express";

const ticketController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const ticket = await TicketModel.getAll();
      console.log('hello world')
      res.status(200).json(ticket);
    } catch (err: any) {
      console.log('getTicket query error: ', err);
      res.status(500).json({ msg: 'Unable to get tickets from database' });
    }
  },

  getTicket: async (req: Request, res: Response) => {
    try {
      const { ticketId } = req.params;
      console.log('hi ma')
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
      const { title, description, status, id } = req.body;
      const ticket = await TicketModel.updateTicket(
        id,
        title,
        description,
        status,
      );


      res.status(201).json({
        status: 'Ticket updated!',
        ticket
      });
    } catch (err) {
      console.log('createTicket query error: ', err);
      res.status(500).json({ msg: 'Unable to create ticket' });
    }
  },

  deleteTicket: async (req: Request, res: Response) => {
    try {
      let { ticketId } = req.body;
      console.log()
      let ticket = await TicketModel.deleteTicket(ticketId);

      res.status(201).json({
        status: 'Ticket deleted!', ticket
      });
    } catch (err) {
      console.log('deleteTicket query error: ', err);
      res.status(500).json({ msg: 'Unable to delete ticket' });
    }
  }
};

export default ticketController;
