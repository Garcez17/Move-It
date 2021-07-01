import { useContextSelector } from "use-context-selector";
import { ChallengesCountdownContext } from "../contexts/ChallengesCoundownContext";

export function useChallengesCountdown() {
  const cycle = useContextSelector(ChallengesCountdownContext, challengesCountdown => challengesCountdown.cycle);
  const hasBreak = useContextSelector(ChallengesCountdownContext, challengesCountdown => challengesCountdown.hasBreak);
  const increaseCycle = useContextSelector(ChallengesCountdownContext, challengesCountdown => challengesCountdown.increaseCycle);
  const resetCycle = useContextSelector(ChallengesCountdownContext, challengesCountdown => challengesCountdown.resetCycle);

  return {
    cycle,
    hasBreak,
    increaseCycle,
    resetCycle,
  }
}