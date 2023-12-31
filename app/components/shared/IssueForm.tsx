'use client';

import 'easymde/dist/easymde.min.css';

import ErrorMessage from '@/app/components/shared/ErrorMessage';
import Spinner from '@/app/components/shared/Spinner';
import { PostIssueFormData, postIssueSchema } from '@/app/schemas/issue';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';

interface Props {
  issue?: Issue;
}

const IssueForm: React.FC<Props> = ({ issue }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PostIssueFormData>({
    resolver: zodResolver(postIssueSchema),
  });

  const router = useRouter();
  const [error, setError] = useState('');

  const onSubmit: SubmitHandler<PostIssueFormData> = async (data, event) => {
    event?.preventDefault();

    try {
      if (issue) await axios.patch('/api/issues/' + issue.id, data);
      else await axios.post('/api/issues', data);

      router.push('/issues/list');
      router.refresh();
    } catch (error) {
      setError('Failed to submit issue');
    }
  };

  return (
    <div className="max-w-xl">
      {error ? (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      ) : null}
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register('title')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => {
            return (
              <SimpleMDE placeholder="Description" {...field} ref={null} />
            );
          }}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {issue ? 'Update issue' : 'Submit New Issue'}{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
