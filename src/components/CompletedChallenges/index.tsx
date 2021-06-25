import { useMemo } from 'react';
import { useChallenge } from '../../contexts/ChallengesContext';
import { Container } from './styles';

export function CompletedChallenges() {
  const { challengesCompleted } = useChallenge();

  const challangesComplete= useMemo(() => {
    return String(challengesCompleted).padStart(2, '0').split('');
  }, [challengesCompleted]);
  
  return (
    <Container>
      <span>Desafios completos</span>
      <span>{challangesComplete}</span>
    </Container>
  )
}