import IssueService from '@/prisma/services/issue';
import { Avatar, Card, Flex, Heading, Table, Text } from '@radix-ui/themes';
import Link from 'next/link';
import IssueStatusBadge from '../shared/IssueStatusBadge';

const LatestIssues = async () => {
  const service = IssueService.getInstance();
  const latestIssues = await service.findIssues({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {latestIssues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" gap="2" align="start">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {'assignedToUser' in issue &&
                    typeof issue.assignedToUser === 'object' &&
                    issue.assignedToUser &&
                    'image' in issue.assignedToUser &&
                    typeof issue.assignedToUser.image === 'string' && (
                      <Avatar
                        src={issue.assignedToUser.image}
                        fallback="?"
                        size="2"
                        radius="full"
                      />
                    )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
