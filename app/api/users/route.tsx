import UserService from '@/prisma/services/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const service = UserService.getInstance();
  const users = await service.getUsersOrderedByAsc();
  return NextResponse.json(users);
}
