import { FC, PropsWithChildren } from 'react';
import { Text } from '@radix-ui/themes';

const ErrorMessage: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  if (!children) {
    return null;
  }
  
  return (
    <Text color="red" as="p">
      {children}
    </Text>
  );
};

export default ErrorMessage;
