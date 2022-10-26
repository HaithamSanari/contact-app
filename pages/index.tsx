import type { NextPage } from 'next';
import { Box, Flex, Heading } from '@chakra-ui/react';

const Home: NextPage = () => {
  return (
    <Flex alignItems='center' justifyContent='center' height='90vh'>
      <Box p='4'>
        <Heading size='2xl'>Welcome to Contact App</Heading>
      </Box>
    </Flex>
  );
};

export default Home;
