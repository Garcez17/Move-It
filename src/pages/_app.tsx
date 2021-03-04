import { Sidebar } from '../components/Sidebar';
import GlobalStyles from '../styles/GlobalStyle';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <GlobalStyles />
    </>
  )
}

export default MyApp;
