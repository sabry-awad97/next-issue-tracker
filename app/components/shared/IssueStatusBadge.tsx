import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';
import { sentenceCase } from 'change-case';

type StatusColor = 'red' | 'violet' | 'green';

const getColorForStatus = (status: Status): StatusColor => {
  const colorMap: Record<Status, StatusColor> = {
    [Status.OPEN]: 'red',
    [Status.IN_PROGRESS]: 'violet',
    [Status.CLOSED]: 'green',
  };

  return colorMap[status];
};

interface Props {
  status: Status;
}

const IssueStatusBadge: React.FC<Props> = ({ status }) => (
  <Badge color={getColorForStatus(status)}>{sentenceCase(status)}</Badge>
);

export default IssueStatusBadge;
