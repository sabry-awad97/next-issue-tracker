'use client';

import { Button, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, handleSubmit, control } = useForm<IssueForm>();
  const router = useRouter();

  const onSubmit: SubmitHandler<IssueForm> = async data => {
    await axios.post('/api/issues', data);
    router.push('/issues');
  };

  return (
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register('title')} />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
