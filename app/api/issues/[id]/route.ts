import authOptions from '@/app/auth/authOptions';
import { IssueFormData, issueSchema } from '@/app/schemas/issue';
import IssueService from '@/prisma/services/issue';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params: { id } }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body: IssueFormData = await request.json();
  const validation = await issueSchema.safeParseAsync(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const service = IssueService.getInstance();
  const issue = await service.findIssue(id);

  if (!issue) {
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
  }

  const updatedIssue = await service.updateIssue(id, {
    title: body.title,
    description: body.description,
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  
  const service = IssueService.getInstance();

  const issue = await service.findIssue(id);

  if (!issue) {
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
  }

  await service.deleteIssue(id);

  return NextResponse.json({});
}
