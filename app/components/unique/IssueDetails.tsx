import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import React from 'react';
import IssueStatusBadge from '../shared/IssueStatusBadge';
import Markdown from 'react-markdown';
import { Issue } from '@prisma/client';

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="5" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </>
  );
};

export default IssueDetails;
