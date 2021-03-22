import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import challanges from '../../challenges.json';
import { LevelUpModal } from "../components/LevelUpModal";
import { PlayerContext } from "./PlayerContext";

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

interface ChallengesProviderProps {
  children: ReactNode;
}

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  const { player,  updatePlayer } = useContext(PlayerContext);

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const [experienceToNextLevel, setExperienceToNextLevel] = useState(player ? Math.pow((player.level + 1) * 4, 2) : 0);
  const [activeChallenge, setActiveChallenge] = useState<Challenge>(null);

  useEffect(() => {
    if (player) setExperienceToNextLevel(Math.pow((player.level + 1) * 4, 2));
  }, [player?.level]);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  function levelUp() {
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
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
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) return;

    const { amount } = activeChallenge;

    let finalExperience = player.currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    updatePlayer(player.username, amount, experienceToNextLevel);

    setActiveChallenge(null);
  }

  return (
    <ChallengesContext.Provider value={{ 
      experienceToNextLevel,
      levelUp,
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