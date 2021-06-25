import { useContext, useMemo } from 'react';
import { useChallenge } from '../../contexts/ChallengesContext';
import { PlayerContext } from '../../contexts/PlayerContext';
import { Container } from './styles';

export function CompletedChallenges() {
  const { challengesCompleted } = useChallenge();
  // const { player } = useContext(PlayerContext);

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