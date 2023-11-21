import { getSession } from '@/app/auth/session';
import { patchIssueSchema } from '@/app/schemas/issue';
import IssueService from '@/prisma/services/issue';
import UserService from '@/prisma/services/user';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params: { id } }: Props) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({}, { status: 401 });

    const body = await request.json();

    const validation = await patchIssueSchema.safeParseAsync(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const { assignedToUserId, title, description } = validation.data;

    if (assignedToUserId) {
      const userService = UserService.getInstance();
      const user = await userService.findUser(assignedToUserId);
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 400 });
      }
    }

    const issueService = IssueService.getInstance();
    const issue = await issueService.findIssue(id);

    if (!issue)
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

    const updatedIssue = await issueService.updateIssue(id, {
      title,
      description,
      assignedToUserId,
    });

    return NextResponse.json(updatedIssue);
  } catch (error) {
    console.log('Error: ', error);

    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({}, { status: 401 });

    const issueService = IssueService.getInstance();
    const issue = await issueService.findIssue(id);

    if (!issue) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }

    await issueService.deleteIssue(id);

    return NextResponse.json({});
  } catch (error) {
    console.log('Error: ', error);

    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
