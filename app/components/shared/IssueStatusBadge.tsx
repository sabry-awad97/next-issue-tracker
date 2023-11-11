import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';

type StatusColor = 'red' | 'violet' | 'green';

interface StatusInfo {
  label: string;
  color: StatusColor;
}

const statusMap = new Map<Status, StatusInfo>([
  [Status.OPEN, { label: 'Open', color: 'red' }],
  [Status.IN_PROGRESS, { label: 'In Progress', color: 'violet' }],
  [Status.CLOSED, { label: 'Closed', color: 'green' }],
]);

interface Props {
  status: Status;
}

const IssueStatusBadge: React.FC<Props> = ({ status }) => {
  const { label, color } = statusMap.get(status) || {
    label: 'Unknown',
    color: 'gray',
  };

  return <Badge color={color}>{label}</Badge>;
};

export default IssueStatusBadge;
