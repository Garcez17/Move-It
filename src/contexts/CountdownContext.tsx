import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from 'use-context-selector';
import { useChallenge } from "../hooks/useChallenge";

import { useChallengesCountdown } from '../hooks/useChallengesCountdown';

export type Pomodoro = {
  pom_time: number;
  pom_break: number;
  user_id: string;
}

interface CountdownContextData {
  loading: boolean;
  minutes: number;
  seconds: number;
  totalTime: number;
  pomodoro: Pomodoro;
  hasFinished: boolean;
  isActive: boolean;
  collectData: (data: any) => void;
  handleAddPomodoro: (data: Pomodoro) => void;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge, playAudio } = useChallenge();
  const { cycle, hasBreak } = useChallengesCountdown();

  const [loading, setLoading] = useState(true);
  const [pomodoro, setPomodoro] = useState(null);
  const [totalTime, setTotalTime] = useState(pomodoro?.pom_time * 60 || 1 * 60);
  const [time, setTime] = useState(totalTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const collectData = useCallback((data: any) => {
    setPomodoro(data.pomodoro);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (pomodoro) {
      const { pom_time } = pomodoro;
      const { pom_break } = pomodoro;

      if (cycle % 2 === 0) {
        if (cycle === 8) {
          setTotalTime((pom_time + 5) * 60);
          setTime((pom_time + 5) * 60);
        } else {
          setTotalTime(pom_break * 60);
          setTime(pom_break * 60);
        }
      } else {
        setTotalTime(pom_time * 60);
        setTime(pom_time * 60);
      }
    }
  }, [pomodoro, cycle]);

  const startCountdown = useCallback(() => {
    setIsActive(true);
  }, []);

  const handleAddPomodoro = useCallback((data: Pomodoro) => {
    setPomodoro(data);
  }, []);

  const resetCountdown = useCallback(() => {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(totalTime);
    setHasFinished(false);
  }, [totalTime]);

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 950);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);

      if (!hasBreak) {
        startNewChallenge();
      } else {
        playAudio();
      }
    }
  }, [time, isActive]);
  
  return (
    <CountdownContext.Provider value={{
      loading,
      minutes,
      seconds,
      hasFinished,
      pomodoro,
      handleAddPomodoro,
      isActive,
      startCountdown,
      resetCountdown,
      totalTime,
      collectData,
    }}>
      {children}
    </CountdownContext.Provider>
  )
}
