import { IssueFormData, issueSchema } from '@/app/schemas/issue';
import IssueService from '@/prisma/services/issue';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
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
