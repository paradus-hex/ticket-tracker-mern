import { prisma } from "../server";



const ProjectModel = {
  async createProject(title: string, description: string) {
    return await prisma.project.create({
      data: {
        title, description
      },
    });
  },

  async getAll() {
    return await prisma.project.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        tickets: true,
      },
    });
  },

  async findById(id: string) {
    return await prisma.project.findUnique({
      where: { id },
    });
  },

  async updateProject(id: string, title: string, description: string) {
    return await prisma.project.update({
      where: { id },
      data: {
        title, description
      },
    });
  },

  async deleteProject(id: string) {
    return await prisma.project.delete({
      where: { id },
    });
  },
};

export default ProjectModel;
