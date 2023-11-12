import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '../client';

type IssueCreateBody = Prisma.Args<typeof prisma.issue, 'create'>['data'];

class IssueService {
  private static instance: IssueService | null = null;
  private constructor(private _: PrismaClient) {}
  static getInstance(): IssueService {
    if (!IssueService.instance) {
      IssueService.instance = new IssueService(prisma);
    }

    return IssueService.instance;
  }

  async addIssue(issueBody: IssueCreateBody) {
    const post = await prisma.issue.create({ data: issueBody });
    return post;
  }
}

export default IssueService;
