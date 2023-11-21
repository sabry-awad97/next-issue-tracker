import IssueService from '@/prisma/services/issue';
import { Table } from '@radix-ui/themes';
import IssueStatusBadge from '../../components/shared/IssueStatusBadge';
import Link from '../../components/shared/Link';
import IssuesToolbar from '../../components/unique/IssuesToolbar';
import { Issue, Status } from '@prisma/client';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import Pagination from '@/app/components/shared/Pagination';

interface Props {
  searchParams: {
    status?: Status;
    orderBy?: keyof Issue;
    page?: string;
  };
}

const PAGE_SIZE = 10;

const IssuesPage: NextPage<Props> = async ({ searchParams }) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    {
      label: 'Issue',
      value: 'title',
    },
    {
      label: 'Status',
      value: 'status',
      className: 'hidden md:table-cell',
    },
    {
      label: 'Created',
      value: 'createdAt',
      className: 'hidden md:table-cell',
    },
  ];

  const service = IssueService.getInstance();

  const status = Object.values(Status).includes(searchParams.status!)
    ? searchParams.status
    : undefined;

  const orderBy = columns
    .map(column => column.value)
    .includes(searchParams.orderBy!)
    ? searchParams.orderBy
    : undefined;

  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  const issues = await service.findIssues({
    where: { status },
    orderBy: orderBy ? { [orderBy]: 'asc' } : undefined,
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  const totalIssuesCount = await service.getIssuesCount(status);

  return (
    <div>
      <IssuesToolbar />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map(column => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{ query: { ...searchParams, orderBy: column.value } }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
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
      <Pagination
        totalCount={totalIssuesCount}
        currentPage={page}
        pageSize={10}
      />
    </div>
  );
};

export const dynamic = 'force-dynamic';
// export const revalidate = 0;

export default IssuesPage;
