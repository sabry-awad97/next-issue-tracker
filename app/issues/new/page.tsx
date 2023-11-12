import IssueFormSkeleton from '@/app/components/shared/IssueFormSkeleton';
import dynamic from 'next/dynamic';

const IssueForm = dynamic(() => import('@/app/components/shared/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
