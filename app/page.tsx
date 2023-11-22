import IssueService from '@/prisma/services/issue';
import IssuesSummary from './components/unique/IssuesSummary';
import LatestIssues from './components/unique/LatestIssues';
import { Status } from '@prisma/client';
import IssuesChart from './components/unique/IssuesChart';
import { Flex, Grid } from '@radix-ui/themes';

const Home = async () => {
  const service = IssueService.getInstance();
  const open = await service.getIssuesCount(Status.OPEN);
  const inProgress = await service.getIssuesCount(Status.IN_PROGRESS);
  const closed = await service.getIssuesCount(Status.CLOSED);

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Flex direction="column" gap="5">
        <IssuesSummary open={open} inProgress={inProgress} closed={closed} />
        <IssuesChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
};

export default Home;
