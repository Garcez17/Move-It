import { PlayerProvider } from './PlayerContext';
import { ChallengesProvider } from './ChallengesContext';
import { ReactNode } from 'react';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <PlayerProvider>
      <ChallengesProvider>
        {children}
      </ChallengesProvider>
    </PlayerProvider>
  )
}