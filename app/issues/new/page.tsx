'use client';

import 'easymde/dist/easymde.min.css';

import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { useState } from 'react';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, handleSubmit, control } = useForm<IssueForm>();
  const router = useRouter();
  const [error, setError] = useState('');

  const onSubmit: SubmitHandler<IssueForm> = async data => {
    try {
      await axios.post('/api/issues', data);
      router.push('/issues');
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
    </div>
  );
};

export default NewIssuePage;
