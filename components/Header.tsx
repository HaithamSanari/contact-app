import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Box, Flex, Button, Text, Container, Image } from '@chakra-ui/react';

const Header = () => {
  const { data, status } = useSession();

  const handleLogout = async () => {
    await signOut({
      callbackUrl: 'http://localhost:3000/',
    });
  };

  return (
    <Container bg='#F8F9FA' maxW='100%' py='2'>
      <Flex alignItems='center' justifyContent='space-around'>
        <Box>
          <Link href='/' passHref>
            <Text
              bgClip='text'
              fontSize={['md', 'lg', '2xl']}
              fontWeight='bold'
              color='black'
              cursor='pointer'
            >
              Contact App
            </Text>
          </Link>
        </Box>
        <Box>
          <Flex alignItems='center'>
            {status === 'authenticated' ? (
              <>
                {data.user?.image && data.user.name ? (
                  <Image
                    src={data.user.image}
                    alt={data.user.name}
                    borderRadius='full'
                    boxSize={['40px', '50px']}
                  />
                ) : null}
                <Link href='/dashboard' passHref>
                  <Button
                    colorScheme='messenger'
                    variant='outline'
                    bg='white'
                    color='#0D6EFD'
                    mx={['2', '4']}
                    fontSize='16px'
                    width='70%'
                  >
                    Dashboard
                  </Button>
                </Link>
                <Box>
                  <Button colorScheme='red' width='90%' onClick={handleLogout}>
                    Logout
                  </Button>
                </Box>
              </>
            ) : (
              <Box>
                <Link href='/account' passHref>
                  <Button
                    m='auto'
                    bg='#0D6EFD'
                    colorScheme='messenger'
                    color='white'
                    mr='3'
                    fontWeight='normal'
                  >
                    Sign In
                  </Button>
                </Link>
              </Box>
            )}
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

export default Header;
