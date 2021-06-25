import { ReactNode } from 'react';
import { Provider as NextAuthProvider } from 'next-auth/client';

import { PlayerProvider } from './PlayerContext';
import { ChallengesProvider } from './ChallengesContext';

interface AppProviderProps {
  children: ReactNode;
  session: any;
}

export function AppProvider({ children, session }: AppProviderProps) {
  return (
    <NextAuthProvider session={session}>
      <PlayerProvider>
        {children}
      </PlayerProvider>
    </NextAuthProvider>
  )
}