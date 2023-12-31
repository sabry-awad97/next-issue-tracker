import { Skeleton } from '@/app/components/shared/Skeleton';
import { Box, Table } from '@radix-ui/themes';
import IssuesToolbar from '../../components/unique/IssuesToolbar';

const LoadingIssuesPage = () => {
  const issues = [1, 2, 3, 4, 5];

  return (
    <>
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
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton />
                <Box className="md:hidden">
                  <Skeleton />
                </Box>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default LoadingIssuesPage;
