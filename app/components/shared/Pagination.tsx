import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

const Pagination = ({ currentPage, totalCount, pageSize }: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  if (totalPages === 1) return null;

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {totalPages}
      </Text>
      <Button color="gray" variant="soft" disabled={isFirst}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={isFirst}>
        <ChevronLeftIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={isLast}>
        <ChevronRightIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={isLast}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
