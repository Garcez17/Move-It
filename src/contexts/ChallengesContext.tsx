import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import challanges from '../../challenges.json';
import { LevelUpModal } from "../components/LevelUpModal";
import { api } from "../services/api";

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  currentExperience: number;
  challengesCompleted: number;
  level: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

interface ChallengesProviderProps {
  children: ReactNode;
  email: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  total_experience: number;
}

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  // const { player,  updatePlayer } = useContext(PlayerContext);

  const [level, setLevel] = useState(rest.level);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience);
  const [totalExperience, setTotalExprerience] = useState(rest.total_experience);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState<Challenge>(null);
  const experienceToNextLevel = Math.pow(((level + 1) * 4), 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  const levelUp = useCallback(() => {
    setLevel(oldState => oldState + 1);
    setIsLevelUpModalOpen(true);
  }, [level]);

  const closeLevelUpModal = useCallback(() => {
    setIsLevelUpModalOpen(false);
  }, []);

  const startNewChallenge = useCallback(() => {
    const randomChallangeIndex = Math.floor(Math.random() * challanges.length);
    const challange = challanges[randomChallangeIndex] as Challenge;

    setActiveChallenge(challange);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challange.amount} xp`,
        icon: '/favicon.png',
      })
    }
  }, [challanges]);

  const resetChallenge = useCallback(() => {
    setActiveChallenge(null);
  }, []);

  const completeChallenge = useCallback(async () => {
    if (!activeChallenge) return;

    const { email } = rest;

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
        currentExperience: finalExperience,
        totalExperience: updatedTotalExperience,
        challengesCompleted: updatedChallengesCompleted,
      });
    }

    setChallengesCompleted(updatedChallengesCompleted);
    setCurrentExperience(finalExperience);
    setTotalExprerience(updatedTotalExperience);

    setActiveChallenge(null);
  }, 
  [
    rest, 
    activeChallenge, 
    currentExperience, 
    challengesCompleted, 
    totalExperience, 
    experienceToNextLevel
  ]);

  return (
    <ChallengesContext.Provider value={{ 
      experienceToNextLevel,
      challengesCompleted,
      levelUp,
      level,
      currentExperience,
      startNewChallenge,
      activeChallenge,
      resetChallenge,
      completeChallenge,
      closeLevelUpModal,
    }}>
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}

export const useChallenge = (): ChallengesContextData => useContext(ChallengesContext);