import { Issue, Prisma, PrismaClient, Status } from '@prisma/client';
import prisma from '../client';

type IssueCreateBody = Prisma.Args<typeof prisma.issue, 'create'>['data'];
type IssueId = Prisma.Args<typeof prisma.issue, 'update'>['where']['id'];
type IssueUpdateBody = Prisma.Args<typeof prisma.issue, 'update'>['data'];
type IssueFindManyArgs = Prisma.Args<typeof prisma.issue, 'findMany'>;

class IssueService {
  private static instance: IssueService | null = null;
  private constructor(private client: PrismaClient) {}
  static getInstance(): IssueService {
    if (!IssueService.instance) {
      IssueService.instance = new IssueService(prisma);
    }
    return IssueService.instance;
  }

  async addIssue(data: IssueCreateBody) {
    try {
      const issue = await this.client.issue.create({ data });
      return issue;
    } catch (error) {
      console.error('Error creating issue:', error);
      throw error;
    }
  }

  async updateIssue(id: IssueId, data: IssueUpdateBody) {
    try {
      const issue = await this.client.issue.update({
        where: { id },
        data,
      });
      return issue;
    } catch (error) {
      console.error('Error updating issue:', error);
      throw error;
    }
  }

  async findIssue(id: IssueId) {
    try {
      const issue = await this.client.issue.findUnique({
        where: { id },
      });
      return issue;
    } catch (error) {
      console.error('Error finding issue:', error);
      throw error;
    }
  }

  async findIssues(args: IssueFindManyArgs) {
    try {
      const issues = await this.client.issue.findMany(args);
      return issues;
    } catch (error) {
      console.error('Error finding all issues:', error);
      throw error;
    }
  }

  async deleteIssue(id: IssueId) {
    try {
      const deletedIssue = await this.client.issue.delete({
        where: { id },
      });
      return deletedIssue;
    } catch (error) {
      console.error('Error deleting issue:', error);
      throw error;
    }
  }

  async getIssuesCount(status?: Status) {
    try {
      const count = await this.client.issue.count({
        where: status ? { status } : {},
      });
      return count;
    } catch (error) {
      console.error('Error getting total issues count:', error);
      throw error;
    }
  }
}

export default IssueService;
