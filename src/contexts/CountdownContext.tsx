import Head from "next/head";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { ChallengesContext, useChallenge } from "./ChallengesContext";
import { useChallengesCountdown } from "./ChallengesCoundownContext";

type Pomodoro = {
  pom_time: number;
  pom_break: number;
  user_id: string;
}

interface CountdownContextData {
  minutes: number;
  seconds: number;
  totalTime: number;
  pomodoro: Pomodoro;
  hasFinished: boolean;
  isActive: boolean;
  handleAddPomodoro: (data: Pomodoro) => void;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
  pomodoroData?: Pomodoro;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children, pomodoroData }: CountdownProviderProps) {
  const { startNewChallenge, playAudio } = useChallenge();
  const { cycle, hasBreak } = useChallengesCountdown();
  
  const [pomodoro, setPomodoro] = useState(pomodoroData);
  const [totalTime, setTotalTime] = useState(pomodoro?.pom_time * 60 || 0.1 * 60);
  const [time, setTime] = useState(totalTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

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
      }, 1000);
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
      minutes,
      seconds,
      hasFinished,
      pomodoro,
      handleAddPomodoro,
      isActive,
      startCountdown,
      resetCountdown,
      totalTime,
    }}>
      {children}
    </CountdownContext.Provider>
  )
}

export const useCountdown = (): CountdownContextData => useContext(CountdownContext);