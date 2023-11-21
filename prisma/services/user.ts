import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '../client';

type UserId = Prisma.Args<typeof prisma.user, 'findUnique'>['where']['id'];

export default class UserService {
  private static instance: UserService | null = null;
  private constructor(private client: PrismaClient) {}
  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService(prisma);
    }
    return UserService.instance;
  }

  async findUser(id: UserId) {
    try {
      const issue = await this.client.user.findUnique({
        where: { id },
      });
      return issue;
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }
  }

  async getUsersOrderedByAsc() {
    try {
      const users = await this.client.user.findMany({
        orderBy: {
          name: 'asc',
        },
      });
      return users;
    } catch (error) {
      throw new Error(`Error fetching users: ${error}`);
    }
  }
}
