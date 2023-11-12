import { PrismaClient } from '@prisma/client';
import prisma from '../client';

class IssueService {
  private static instance: IssueService | null = null;
  private constructor(private _: PrismaClient) {}
  static getInstance(): IssueService {
    if (!IssueService.instance) {
      IssueService.instance = new IssueService(prisma);
    }

    return IssueService.instance;
  }
}

export default IssueService;
