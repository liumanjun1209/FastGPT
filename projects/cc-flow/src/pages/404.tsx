import React from 'react';
import { Center, Heading, Text, VStack } from '@chakra-ui/react';

const NotFoundPage = () => {
  return (
    <Center h="100vh">
      <VStack>
        <Heading size="xl">404</Heading>
        <Text color="gray.500">Page not found</Text>
      </VStack>
    </Center>
  );
};

export default NotFoundPage;
