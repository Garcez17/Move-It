import { useContext, useMemo } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';
import { Container } from './styles';

export function CompletedChallenges() {
  const { player } = useContext(PlayerContext);

  const challangesComplete= useMemo(() => {
    if (player) {
      return String(player.challengesCompleted).padStart(2, '0').split('');
    } else {
      return '00';
    }
  }, [player?.challengesCompleted]);
  
  return (
    <Container>
      <span>Desafios completos</span>
      <span>{challangesComplete}</span>
    </Container>
  )
}