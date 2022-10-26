import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import { SessionProvider } from 'next-auth/react';
import AuthWrapper from '../components/AuthWrapper';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
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
