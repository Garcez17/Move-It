import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import challanges from '../../challenges.json';
import { LevelUpModal } from "../components/LevelUpModal";
import { PlayerContext } from "./PlayerContext";
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

  // console.log({
  //   level,
  //   currentExperience,
  //   totalExperience,
  //   challengesCompleted,
  // });

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  function levelUp() {
    setLevel(oldState => oldState + 1);
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

  async function completeChallenge() {
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

    // updatePlayer(player.username, amount, experienceToNextLevel);

    setActiveChallenge(null);
  }

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