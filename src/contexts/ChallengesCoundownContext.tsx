import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from 'use-context-selector';

type ChallengesCountdownContextData = {
  cycle: number;
  hasBreak: boolean;
  increaseCycle: () => void;
  resetCycle: () => void;
}

export const ChallengesCountdownContext = createContext({} as ChallengesCountdownContextData);

type ChallengesCountdownProviderProps = {
  children: ReactNode;
}

export function ChallengesCountdownProvider({ children }: ChallengesCountdownProviderProps) {
  const [cycle, setCycle] = useState(1);
  const [hasBreak, setHasBreak] = useState(false);

  useEffect(() => {
    if (cycle % 2 === 0) {
      setHasBreak(true);
    } else {
      setHasBreak(false);
    }
  }, [cycle]);

  const increaseCycle = useCallback(() => {
    setCycle(oldState => oldState + 1);
  }, [cycle]);

  const resetCycle = useCallback(() => {
    setCycle(1);
  }, [cycle]);

  return (
    <ChallengesCountdownContext.Provider value={{ cycle, increaseCycle, resetCycle, hasBreak }}>
      {children}
    </ChallengesCountdownContext.Provider>
  )
}
