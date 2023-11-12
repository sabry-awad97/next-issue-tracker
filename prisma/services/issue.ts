import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '../client';

type IssueCreateBody = Prisma.Args<typeof prisma.issue, 'create'>['data'];
type IssueId = Prisma.Args<typeof prisma.issue, 'update'>['where']['id'];
type IssueUpdateBody = Prisma.Args<typeof prisma.issue, 'update'>['data'];

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
    const issue = await prisma.issue.create({ data: issueBody });
    return issue;
  }

  async updateIssue(id: IssueId, updatedData: IssueUpdateBody) {
    const issue = await prisma.issue.update({
      where: { id },
      data: updatedData,
    });
    return issue;
  }

  async findIssue(id: IssueId) {
    const issue = await prisma.issue.findUnique({
      where: { id },
    });
    return issue;
  }

  async findIssues() {
    const issues = await prisma.issue.findMany({});
    return issues;
  }
}

export default IssueService;
