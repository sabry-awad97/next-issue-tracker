'use client';

import type { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Skeleton } from '../shared/Skeleton';

const UNASSIGNED_VALUE = 'unassigned';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    isLoading,
    error,
    data: users,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axios.get<User[]>('/api/users');
      return data;
    },
    staleTime: 60 * 1000, // 60 seconds
    retry: 3,
  });

  const handleAssigneeChange = async (userId: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId !== UNASSIGNED_VALUE ? userId : null,
      });

      toast.success('Issue updated successfully.', { duration: 2000 });
    } catch (error) {
      toast.error('Failed to update issue. Please try again.', {
        duration: 2000,
      });
    }
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
