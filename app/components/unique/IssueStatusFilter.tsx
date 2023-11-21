'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();

  const handleStatusChange = (status: string): void => {
    const params = new URLSearchParams();

    if (status && status !== unknownStatus.value) {
      params.append('status', status);
    }

    const orderBy = searchParams.get('orderBy');
    if (orderBy) params.append('orderBy', orderBy);

    const query = params.size ? '?' + params.toString() : '';

    router.push(`/issues/list${query}`);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get('status') || unknownStatus.value}
      onValueChange={handleStatusChange}
    >
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
