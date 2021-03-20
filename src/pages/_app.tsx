import GlobalStyles from '../styles/GlobalStyle';
import { PlayerProvider } from '../contexts/PlayerContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <PlayerProvider>
        <Component {...pageProps} />
      </PlayerProvider>
      <GlobalStyles />
    </>
  )
}

export default MyApp;
