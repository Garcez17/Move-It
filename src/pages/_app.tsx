import GlobalStyles from '../styles/GlobalStyle';
import { AppProvider } from '../contexts';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppProvider session={pageProps.session}>
        <Component {...pageProps} />
        <GlobalStyles />
      </AppProvider>
    </>
  )
}

export default MyApp;
