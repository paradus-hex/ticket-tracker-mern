import { prisma } from "../server";


export type User = { id: string, name: string, email: string, hashedPassword: string, role: 'ADMIN' | 'USER' }

const UserModel = {
  async createUser(name: string, email: string, hashedPassword: string) {
    return await prisma.user.create({
      data: {
        name: name,
        email: email,
        hashedPassword: hashedPassword,
      },
    });
  },

  async getAll() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  },

  async findById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
    });
  },

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  },

  async updateUserInformation(id: string, name: string, email: string, role: 'ADMIN' | 'USER') {
    return await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        role,
      },
    });
  },

  async deleteUser(id: string) {
    return await prisma.user.delete({
      where: { id },
    });
  },
};

export default UserModel;
