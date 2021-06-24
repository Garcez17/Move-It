import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import { PlayerContext } from '../../contexts/PlayerContext';
import { Container } from './styles';

export function Profile() {
  const { player } = useContext(PlayerContext);

  return (
    <Container>
      <img src={player ? player.image_url : null} alt={player ? player.name : 'Carregando...'}/>

      <div>
        <strong>{player ? player.name : 'Carregando...'}</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {player ? player.level: 'Carregando...'}
        </p>
      </div>
    </Container>
  )
}