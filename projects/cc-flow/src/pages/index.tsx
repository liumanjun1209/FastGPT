import { Box, Center, Heading, Text } from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/flow');
  }, [router]);

  return (
    <Center h="100vh">
      <Box textAlign="center">
        <Heading size="lg" mb={2}>
          cc-flow
        </Heading>
        <Text color="gray.500">Workflow Editor</Text>
      </Box>
    </Center>
  );
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
}

export default HomePage;
