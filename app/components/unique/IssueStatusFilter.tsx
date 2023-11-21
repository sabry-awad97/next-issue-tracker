'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';

type StatusOption = {
  label: string;
  value?: Status;
};

const statusMap: Map<string, StatusOption> = new Map([
  ['ALL', { label: 'All' }],
  [Status.OPEN, { label: 'Open', value: Status.OPEN }],
  [Status.IN_PROGRESS, { label: 'In Progress', value: Status.IN_PROGRESS }],
  [Status.CLOSED, { label: 'Closed', value: Status.CLOSED }],
]);

const IssueStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {[...statusMap.values()].map(status => (
          <Select.Item key={status.label} value={status.value || 'unknown'}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
