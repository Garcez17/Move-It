import { useContextSelector } from "use-context-selector";
import { CountdownContext } from "../contexts/CountdownContext";

export function useCountdown() {
  const minutes = useContextSelector(CountdownContext, countdown => countdown.minutes);
  const seconds = useContextSelector(CountdownContext, countdown => countdown.seconds);
  const handleAddPomodoro = useContextSelector(CountdownContext, countdown => countdown.handleAddPomodoro);
  const hasFinished = useContextSelector(CountdownContext, countdown => countdown.hasFinished);
  const isActive = useContextSelector(CountdownContext, countdown => countdown.isActive);
  const pomodoro = useContextSelector(CountdownContext, countdown => countdown.pomodoro);
  const resetCountdown = useContextSelector(CountdownContext, countdown => countdown.resetCountdown);
  const startCountdown = useContextSelector(CountdownContext, countdown => countdown.startCountdown);
  const totalTime = useContextSelector(CountdownContext, countdown => countdown.totalTime);
  const collectData = useContextSelector(CountdownContext, countdown => countdown.collectData);
  const loading = useContextSelector(CountdownContext, countdown => countdown.loading);

  return {
    minutes,
    seconds,
    handleAddPomodoro,
    hasFinished,
    isActive,
    pomodoro,
    resetCountdown,
    startCountdown,
    totalTime,
    collectData,
    loading,
  }
};
