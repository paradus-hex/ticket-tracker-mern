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
      const ticket = await TicketModel.getTicket(ticketId);
      res.status(200).json(ticket);
    } catch (err) {
      res.status(500).json({ msg: 'Unable to get ticket from database' });
    }
  },

  getProjectTickets: async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
      console.log('Hi MAA', projectId)
      const ticket = await TicketModel.getProjectTickets(projectId);

      res.status(200).json(ticket);
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
  },
  assignUsers: async (req: Request, res: Response) => {
    try {
      const { ticketId } = req.params;
      const { userIds } = req.body
      const ticket = await TicketModel.assignUsers(ticketId, userIds);
      res.status(200).json({ ticket });
    } catch (err) {
      console.log('Assign error: ', err);
      res.status(500).json({ msg: 'Unable to get ticket from database' });
    }
  },
  unAssignUser: async (req: Request, res: Response) => {
    try {
      const { userId, ticketId } = req.body
      await TicketModel.unAssignUser(ticketId, userId);
      res.status(200).send("User has been unassigned!");
    } catch (err) {
      console.log('Unassign Error: ', err);
      res.status(500).json({ msg: 'Unable to get ticket from database' });
    }
  }, addComment: async (req: Request, res: Response) => {
    try {
      const { ticketId, userId } = req.params;
      const { content } = req.body
      const comments = await TicketModel.addComment(userId, ticketId, content);
      res.status(200).json({ comments });
    } catch (err) {
      console.log('Add Comment: ', err);
      res.status(500).json({ msg: 'Unable to add comment' });
    }
  }, deleteComment: async (req: Request, res: Response) => {
    try {
      const { id } = req.body
      const comments = await TicketModel.deleteComment(id);
      res.status(200).json({ comments });
    } catch (err) {
      console.log('Delete Comment: ', err);
      res.status(500).json({ msg: 'Unable to delete comment' });
    }
  }, editComment: async (req: Request, res: Response) => {
    try {
      const { id, content } = req.body
      const comments = await TicketModel.editComment(id, content);
      res.status(200).json({ comments });
    } catch (err) {
      console.log('Edit Comment: ', err);
      res.status(500).json({ msg: 'Unable to edit comment' });
    }
  },

};

export default ticketController;
