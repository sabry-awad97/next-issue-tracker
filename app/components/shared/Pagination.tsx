'use client';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

const Pagination = ({ currentPage, totalCount, pageSize }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalCount / pageSize);
  if (totalPages === 1) return null;

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const changePage = (page: number) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    router.push('?' + params.toString());
  };

  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {totalPages}
      </Text>
      <Button
        color="gray"
        variant="soft"
        disabled={isFirst}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={isFirst}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={isLast}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={isLast}
        onClick={() => changePage(totalPages)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
