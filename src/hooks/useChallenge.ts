import { useContextSelector } from "use-context-selector";
import { ChallengesContext } from "../contexts/ChallengesContext";

export function useChallenge() {
  const activeChallenge = useContextSelector(ChallengesContext, challenges => challenges.activeChallenge);
  const challengesCompleted = useContextSelector(ChallengesContext, challenges => challenges.challengesCompleted);
  const closeCompletePomodoroModal = useContextSelector(ChallengesContext, challenges => challenges.closeCompletePomodoroModal);
  const closeLevelUpModal = useContextSelector(ChallengesContext, challenges => challenges.closeLevelUpModal);
  const completeChallenge = useContextSelector(ChallengesContext, challenges => challenges.completeChallenge);
  const continueCycle = useContextSelector(ChallengesContext, challenges => challenges.continueCycle);
  const currentExperience = useContextSelector(ChallengesContext, challenges => challenges.currentExperience);
  const experienceToNextLevel = useContextSelector(ChallengesContext, challenges => challenges.experienceToNextLevel);
  const level = useContextSelector(ChallengesContext, challenges => challenges.level);
  const levelUp = useContextSelector(ChallengesContext, challenges => challenges.levelUp);
  const playAudio = useContextSelector(ChallengesContext, challenges => challenges.playAudio);
  const pomodorosCompleted = useContextSelector(ChallengesContext, challenges => challenges.pomodorosCompleted);
  const resetChallenge = useContextSelector(ChallengesContext, challenges => challenges.resetChallenge);
  const startNewChallenge = useContextSelector(ChallengesContext, challenges => challenges.startNewChallenge);
  const collectData = useContextSelector(ChallengesContext, challenges => challenges.collectData);
  const loading = useContextSelector(ChallengesContext, challenges => challenges.loading);

  return {
    activeChallenge,
    challengesCompleted,
    closeCompletePomodoroModal,
    closeLevelUpModal,
    completeChallenge,
    continueCycle,
    currentExperience,
    experienceToNextLevel,
    level,
    levelUp,
    playAudio,
    pomodorosCompleted,
    resetChallenge,
    startNewChallenge,
    collectData,
    loading,
  }
};