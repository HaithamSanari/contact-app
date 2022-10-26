import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import Header from '../components/Header';
import AuthWrapper from '../components/AuthWrapper';
import { ChakraProvider } from '@chakra-ui/react';
function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <AuthWrapper>
        <ChakraProvider>
          <Header />
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthWrapper>
    </SessionProvider>
  );
}

export default MyApp;
