import authOptions from '@/app/auth/authOptions';
import AssigneeSelect from '@/app/components/unique/AssigneeSelect';
import DeleteIssueButton from '@/app/components/unique/DeleteIssueButton';
import EditIssueButton from '@/app/components/unique/EditIssueButton';
import IssueDetails from '@/app/components/unique/IssueDetails';
import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await prisma.issue.findUnique({
    where: {
      id,
    },
  });

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
            <AssigneeSelect />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
