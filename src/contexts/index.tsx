import { ReactNode } from 'react';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { ThemeProvider } from '../hooks/useTheme';
import { ChallengesCountdownProvider } from './ChallengesCoundownContext';
import { ChallengesProvider } from './ChallengesContext';
import { CountdownProvider } from './CountdownContext';

interface AppProviderProps {
  children: ReactNode;
  session: any;
}

export function AppProvider({ children, session }: AppProviderProps) {
  return (
    <NextAuthProvider session={session}>
      <ThemeProvider>
        <ChallengesCountdownProvider>
          <ChallengesProvider>
            <CountdownProvider>
              {children}
            </CountdownProvider>
          </ChallengesProvider>
        </ChallengesCountdownProvider>
      </ThemeProvider>
    </NextAuthProvider>
  )
}