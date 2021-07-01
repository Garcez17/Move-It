import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from 'use-context-selector';

import challanges from '../../challenges.json';
import { LevelUpModal } from "../components/LevelUpModal";
import { CompletedPomodoroModal } from "../components/CompletedPomodoroModal";
import { api } from "../services/api";
import { useChallengesCountdown } from "../hooks/useChallengesCountdown";

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface BodyData {
  challenge_amount: number;
}

interface ChallengesContextData {
  activeChallenge: Challenge;
  loading: boolean;
  experienceToNextLevel: number;
  currentExperience: number;
  challengesCompleted: number;
  pomodorosCompleted: number;
  level: number;
  collectData: (data: any) => void;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
  closeCompletePomodoroModal: () => void;
  continueCycle: () => void;
  playAudio: (body?: BodyData) => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

interface ChallengesProviderProps {
  children: ReactNode;
}

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const { increaseCycle, cycle, resetCycle } = useChallengesCountdown();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [level, setLevel] = useState(null);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(null);
  const [currentExperience, setCurrentExperience] = useState(null);
  const [totalExperience, setTotalExprerience] = useState(null);
  const [challengesCompleted, setChallengesCompleted] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const [isCompletePomodoroOpen, setIsCompletePomodoroOpen] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState<Challenge>(null);
  const experienceToNextLevel = Math.pow(((level + 1) * 4), 2);

  const collectData = useCallback((data: any) => {
    setLoading(true);
    setEmail(data.email)
    setLevel(data.level);
    setPomodorosCompleted(data.pomodoros_completed);
    setCurrentExperience(data.current_experience);
    setTotalExprerience(data.total_experience);
    setChallengesCompleted(data.challenges_completed);
    setLoading(false);
  }, []);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  const playAudio = useCallback((body?: BodyData) => {
    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      if (body) {
        new Notification('Novo desafio 🎉', {
          body: `Valendo ${body.challenge_amount} xp`,
          icon: '/favicon.png',
        })
      } else {
        new Notification('Descanso finalizado 🎉', {
          body: 'Volte para continuar seu ciclo de pomodoro!',
          icon: '/favicon.png',
        })
      }
    }
  }, []);

  const levelUp = useCallback(() => {
    setLevel(oldState => oldState + 1);
    setIsLevelUpModalOpen(true);
  }, [level]);

  const closeLevelUpModal = useCallback(() => {
    setIsLevelUpModalOpen(false);
  }, []);

  const closeCompletePomodoroModal = useCallback(() => {
    setIsCompletePomodoroOpen(false);
  }, []);

  const startNewChallenge = useCallback(() => {
    const randomChallangeIndex = Math.floor(Math.random() * challanges.length);
    const challange = challanges[randomChallangeIndex] as Challenge;

    setActiveChallenge(challange);

    playAudio({ challenge_amount: challange.amount});
  }, [challanges]);

  const resetChallenge = useCallback(() => {
    increaseCycle();
    setActiveChallenge(null);
  }, []);

  const completePomodoro = useCallback(async () => {
    setIsCompletePomodoroOpen(true);

    let finalExperience = currentExperience + 250;

    const updatedTotalExperience = totalExperience + 250;
    const updatedPomodorosCompleted = pomodorosCompleted + 1;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();

      await api.post('/users', {
        email,
        level: level + 1,
        current_experience: finalExperience,
        total_experience: updatedTotalExperience,
        pomodoros_completed: updatedPomodorosCompleted,
      });
    } else {
      await api.post('/users', {
        email,
        level,
        current_experience: finalExperience,
        total_experience: updatedTotalExperience,
        pomodoros_completed: updatedPomodorosCompleted,
      });
    }

    setPomodorosCompleted(updatedPomodorosCompleted)
    setCurrentExperience(finalExperience);
    setTotalExprerience(updatedTotalExperience);
  }, [
    currentExperience, 
    totalExperience, 
    experienceToNextLevel,
    pomodorosCompleted,
  ]);

  const continueCycle = useCallback(() => {
    if (cycle === 8) {
      completePomodoro();
      resetCycle();
    } else {
      increaseCycle();
    }
  }, [cycle]);

  const completeChallenge = useCallback(async () => {
    if (!activeChallenge) return;

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    const updatedChallengesCompleted = challengesCompleted + 1;
    const updatedTotalExperience = totalExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();

      await api.post('/users', {
        email,
        level: level + 1,
        current_experience: finalExperience,
        total_experience: updatedTotalExperience,
        challenges_completed: updatedChallengesCompleted,
      });
    } else {
      await api.post('/users', {
        email,
        level,
        current_experience: finalExperience,
        total_experience: updatedTotalExperience,
        challenges_completed: updatedChallengesCompleted,
      });
    }

    setChallengesCompleted(updatedChallengesCompleted);
    setCurrentExperience(finalExperience);
    setTotalExprerience(updatedTotalExperience);
    increaseCycle();

    setActiveChallenge(null);
  }, 
  [
    activeChallenge, 
    currentExperience, 
    challengesCompleted, 
    totalExperience, 
    experienceToNextLevel
  ]);

  return (
    <ChallengesContext.Provider value={{ 
      loading,
      experienceToNextLevel,
      challengesCompleted,
      pomodorosCompleted,
      levelUp,
      level,
      collectData,
      currentExperience,
      startNewChallenge,
      activeChallenge,
      resetChallenge,
      completeChallenge,
      closeLevelUpModal,
      closeCompletePomodoroModal,
      continueCycle,
      playAudio,
    }}>
      {children}

      {isLevelUpModalOpen && <LevelUpModal isOpen={isLevelUpModalOpen} onRequestClose={closeLevelUpModal} />}
      {isCompletePomodoroOpen && <CompletedPomodoroModal isOpen={isCompletePomodoroOpen} onRequestClose={closeCompletePomodoroModal} />}
    </ChallengesContext.Provider>
  )
}
