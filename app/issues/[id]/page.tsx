import { getSession } from '@/app/auth/session';
import AssigneeSelect from '@/app/components/unique/AssigneeSelect';
import DeleteIssueButton from '@/app/components/unique/DeleteIssueButton';
import EditIssueButton from '@/app/components/unique/EditIssueButton';
import IssueDetails from '@/app/components/unique/IssueDetails';
import IssueService from '@/prisma/services/issue';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import { cache } from 'react';

interface Props {
  params: {
    id: string;
  };
}

const fetchIssue = cache((issueId: string) =>
  IssueService.getInstance().findIssue(issueId)
);

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const issue = await fetchIssue(id);
  const session = await getSession();

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box className="col-span-1">
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params: { id } }: Props) {
  const issue = await fetchIssue(id);

  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id,
  };
}

export default IssueDetailPage;
