import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssuesSummary = ({ open, inProgress, closed }: Props) => {
  const statusMap: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    {
      label: 'Open Issues',
      value: open,
      status: Status.OPEN,
    },
    {
      label: 'In-progress Issues',
      value: inProgress,
      status: Status.IN_PROGRESS,
    },
    {
      label: 'Closed Issues',
      value: closed,
      status: Status.CLOSED,
    },
  ];

  return (
    <Flex gap="4">
      {statusMap.map(({ label, value, status }) => (
        <Card key={status}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/issues/list?status=${status}`}
            >
              {label}
            </Link>
            <Text size="5" className="font-bold">
              {value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssuesSummary;
