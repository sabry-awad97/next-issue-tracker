'use client';

import type { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Skeleton } from '../shared/Skeleton';

const UNASSIGNED_VALUE = 'unassigned';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { isLoading, error, data: users } = useUsers();
  const mutation = useUpdateIssue();

  const handleAssigneeChange = async (userId: string) => {
    mutation.mutate(
      {
        issueId: issue.id,
        userId: userId !== UNASSIGNED_VALUE ? userId : null,
      },
      {
        onSuccess() {
          toast.success('Issue updated successfully.', {
            duration: 2000,
          });
        },
        onError() {
          toast.error('Failed to update issue. Please try again.', {
            duration: 2000,
          });
        },
      }
    );
  };

  if (isLoading) return <Skeleton />;

  if (error) return null;

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || UNASSIGNED_VALUE}
        onValueChange={handleAssigneeChange}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value={UNASSIGNED_VALUE}>Unassigned</Select.Item>
            {users?.map(user => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;

const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axios.get<User[]>('/api/users');
      return data;
    },
    staleTime: 60 * 60 * 1000, // 1 hour
    retry: 3,
  });
};

const useUpdateIssue = () => {
  return useMutation({
    mutationFn: async ({
      issueId,
      userId,
    }: {
      issueId: string;
      userId: string | null;
    }) => {
      const { data } = await axios.patch<Issue>(`/api/issues/${issueId}`, {
        assignedToUserId: userId,
      });

      return data;
    },
  });
};
