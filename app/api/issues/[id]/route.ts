import authOptions from '@/app/auth/authOptions';
import { patchIssueSchema } from '@/app/schemas/issue';
import IssueService from '@/prisma/services/issue';
import UserService from '@/prisma/services/user';
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

  const body = await request.json();

  const validation = await patchIssueSchema.safeParseAsync(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const { assignedToUserId, title, description } = validation.data;

  if (assignedToUserId) {
    const service = UserService.getInstance();
    const user = await service.findUser(assignedToUserId);
    if (!user)
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
  }

  const service = IssueService.getInstance();
  const issue = await service.findIssue(id);

  if (!issue) {
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
  }

  const updatedIssue = await service.updateIssue(id, {
    title,
    description,
    assignedToUserId,
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
