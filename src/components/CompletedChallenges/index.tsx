import { useContext, useMemo } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import { Container } from './styles';

export function CompletedChallenges() {
  const { challengesCompleted } = useContext(ChallengesContext);

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