import { ReactNode } from 'react';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { ThemeProvider } from '../hooks/useTheme';
import { ChallengesCountdownProvider } from './ChallengesCoundownContext';

interface AppProviderProps {
  children: ReactNode;
  session: any;
}

export function AppProvider({ children, session }: AppProviderProps) {
  return (
    <NextAuthProvider session={session}>
      <ThemeProvider>
        <ChallengesCountdownProvider>
          {children}
        </ChallengesCountdownProvider>
      </ThemeProvider>
    </NextAuthProvider>
  )
}