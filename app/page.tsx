import IssueService from '@/prisma/services/issue';
import IssuesSummary from './components/unique/IssuesSummary';
import LatestIssues from './components/unique/LatestIssues';
import { Status } from '@prisma/client';
import IssuesChart from './components/unique/IssuesChart';

const Home = async () => {
  const service = IssueService.getInstance();
  const open = await service.getIssuesCount(Status.OPEN);
  const inProgress = await service.getIssuesCount(Status.IN_PROGRESS);
  const closed = await service.getIssuesCount(Status.CLOSED);

  return (
    <>
      <LatestIssues />
      <IssuesSummary open={open} inProgress={inProgress} closed={closed} />
      <IssuesChart open={open} inProgress={inProgress} closed={closed} />
    </>
  );
};

export default Home;
