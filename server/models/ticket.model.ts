import { prisma } from "../server";


const TicketModel = {
  getAll: async () => {
    return await prisma.ticket.findMany();
  },

  getTicket: async (id: string) => {
    return await prisma.ticket.findUnique({
      where: { id },
      include: { AssignedUser: true },
    });
  },

  getProjectTickets: async (projectId: string) => {
    // console.log('hebabguaghuibgiub')
    // return await prisma.project.findMany({
    //   where: { id: projectId },
    //   select: { tickets: true }
    // });
    return await prisma.project.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        tickets: true,
      },
    });
  },

  createTicket: async (
    title: string,
    description: string,
    projectId: string
  ) => {
    return await prisma.ticket.create({
      data: {
        title, description, projectId
      }
    });
  },

  updateTicket: async (
    ticketId: string,
    title: string,
    description: string,
    status: 'INPROGRESS' | 'RESOLVED' | 'UNASSIGNED'
  ) => {
    return await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        title,
        description,
        status,
      },
    });
  },

  deleteTicket: async (ticketId: string) => {
    return await prisma.ticket.delete({
      where: { id: ticketId },
    });
  },
};

export default TicketModel;
