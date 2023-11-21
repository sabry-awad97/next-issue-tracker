'use client';

import {
  QueryClient,
  QueryClientProvider as RQueryClientProvider,
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <RQueryClientProvider client={queryClient}>{children}</RQueryClientProvider>
  );
};

export default QueryClientProvider;
