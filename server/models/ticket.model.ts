import { prisma } from "../server";


const TicketModel = {
  getAll: async () => {
    return await prisma.ticket.findMany();
  },

  getTicket: async (id: string) => {
    const ticketWithAssignedUsers = await prisma.ticket.findUnique({
      where: { id },
      include: {
        AssignedUser: {
          select: {
            user: true,
          },
        },
      },
    });

    if (ticketWithAssignedUsers) {
      const assignedUsers = ticketWithAssignedUsers.AssignedUser.map((assignedUser) => assignedUser.user);
      const availableUsers = await prisma.user.findMany({
        where: {
          assigned: {
            none: {
              ticket: {
                id
              },
            },
          },
        },
      });

      return {
        ...ticketWithAssignedUsers,
        assignedUsers,
        availableUsers,
      };
    }


  },
  assignUsers: async (id: string, userIds: string[]) => {
    const assignedUsers = userIds.map((userId) =>
      prisma.assignedUser.create({
        data: {
          user: { connect: { id: userId } },
          ticket: { connect: { id } },
        },
      })
    );

    return await Promise.all(assignedUsers);

  },

  unAssignUser: async (ticketId: string, userId: string) => {
    await prisma.assignedUser.delete({
      where: {
        userId_ticketId: {
          ticketId, userId
        }

      },
    })
  },



  getProjectTickets: async (projectId: string) => {
    return await prisma.project.findUnique({
      where: { id: projectId },
      select: {
        tickets: {
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
          },
        },
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
        title,
        description,
        project: {
          connect: {
            id: projectId,
          },
        }
      }
    });
  },

  updateTicket: async (
    id: string,
    title: string,
    description: string,
    status: 'INPROGRESS' | 'RESOLVED' | 'UNASSIGNED'
  ) => {
    return await prisma.ticket.update({
      where: { id },
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
