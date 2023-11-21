'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { sentenceCase } from 'change-case';

type StatusOption = {
  label: string;
  value: Status;
};

const statuses: StatusOption[] = [
  ...Object.values(Status).map(status => ({
    label: sentenceCase(status),
    value: status as Status,
  })),
];

const unknownStatus = { label: 'All', value: 'Unknown' };

const IssueStatusFilter = () => {
  const router = useRouter();

  const handleStatusChange = (status: string): void => {
    const params = new URLSearchParams({ status });
    const query = status === unknownStatus.value ? '' : '?' + params.toString();
    router.push(`/issues/list${query}`);
  };

  return (
    <Select.Root onValueChange={handleStatusChange}>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        <Select.Item key={unknownStatus.value} value={unknownStatus.value}>
          {unknownStatus.label}
        </Select.Item>
        {statuses.map(status => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
