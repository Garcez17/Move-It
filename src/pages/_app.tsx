import GlobalStyles from '../styles/GlobalStyle';
import { AppProvider } from '../contexts';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
      <GlobalStyles />
    </>
  )
}

export default MyApp;
