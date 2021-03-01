import { useContext, useMemo } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallenges() {
  const { challengesCompleted } = useContext(ChallengesContext);

  const challangesComplete= useMemo(() => {
    return String(challengesCompleted).padStart(2, '0').split('');
  }, [challengesCompleted]);
  
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challangesComplete}</span>
    </div>
  )
}