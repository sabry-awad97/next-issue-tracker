import Pagination from '@/app/components/shared/Pagination';
import IssuesTable, {
  IssueQuery,
  columnsNames,
} from '@/app/components/unique/IssuesTable';
import IssueService from '@/prisma/services/issue';
import { Status } from '@prisma/client';
import { Box, Flex } from '@radix-ui/themes';
import { Metadata, NextPage } from 'next';
import IssuesToolbar from '../../components/unique/IssuesToolbar';

interface Props {
  searchParams: IssueQuery;
}

const PAGE_SIZE = 10;

const IssuesPage: NextPage<Props> = async ({ searchParams }) => {
  const status = Object.values(Status).includes(searchParams.status!)
    ? searchParams.status
    : undefined;

  const orderBy = columnsNames.includes(searchParams.orderBy!)
    ? searchParams.orderBy
    : undefined;

  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  const service = IssueService.getInstance();

  const issues = await service.findIssues({
    where: { status },
    orderBy: orderBy ? { [orderBy]: 'asc' } : undefined,
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  const totalIssuesCount = await service.getIssuesCount(status);

  return (
    <Flex direction="column" gap="3">
      <IssuesToolbar />
      {totalIssuesCount && (
        <>
          <IssuesTable searchParams={searchParams} issues={issues} />
          <Pagination
            totalCount={totalIssuesCount}
            currentPage={page}
            pageSize={10}
          />
        </>
      )}
    </Flex>
  );
};

export const dynamic = 'force-dynamic';
// export const revalidate = 0;

export default IssuesPage;

export const metadata: Metadata = {
  title: 'Explore Project Issues: Comprehensive List and Details',
  description:
    "Effortlessly navigate and manage your project's issues. Access a detailed list showcasing statuses, priorities, and essential details for efficient tracking. Stay organized and informed, ensuring seamless resolution and progress monitoring within your project workflow.",
};
