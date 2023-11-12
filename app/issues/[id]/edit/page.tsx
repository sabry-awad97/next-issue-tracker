import IssueFormSkeleton from '@/app/components/shared/IssueFormSkeleton';
import IssueService from '@/prisma/services/issue';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

const IssueForm = dynamic(() => import('@/app/components/shared/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const EditIssuePage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const service = IssueService.getInstance();
  const issue = await service.findIssue(id);

  if (!issue) {
    notFound();
  }

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
