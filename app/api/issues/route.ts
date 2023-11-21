import authOptions from '@/app/auth/authOptions';
import { IssueFormData, issueSchema } from '@/app/schemas/issue';
import IssueService from '@/prisma/services/issue';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body: IssueFormData = await req.json();
  const validation = await issueSchema.safeParseAsync(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const service = IssueService.getInstance();

  const newIssue = await service.addIssue({
    title: body.title,
    description: body.description,
  });

  return NextResponse.json(newIssue, { status: 201 });
}
