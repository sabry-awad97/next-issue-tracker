import IssueService from '@/prisma/services/issue';
import { Table } from '@radix-ui/themes';
import IssueStatusBadge from '../../components/shared/IssueStatusBadge';
import Link from '../../components/shared/Link';
import IssuesToolbar from '../../components/unique/IssuesToolbar';
import { Status } from '@prisma/client';
import { NextPage } from 'next';

interface Props {
  searchParams: {
    status?: Status;
  };
}

const IssuesPage: NextPage<Props> = async ({ searchParams }) => {
  const service = IssueService.getInstance();
  const issues = await service.findIssuesByStatus(searchParams.status);

  return (
    <div>
      <IssuesToolbar />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = 'force-dynamic';
// export const revalidate = 0;

export default IssuesPage;
