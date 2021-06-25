import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import { PlayerContext } from '../../contexts/PlayerContext';
import { Container } from './styles';

type ProfileProps = {
  image_url: string;
  name: string;
  level: number;
}

export function Profile({ image_url, level, name }: ProfileProps) {
  // const { player } = useContext(PlayerContext);

  return (
    <Container>
      <img src={image_url} alt={name}/>

      <div>
        <strong>{name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
        </p>
      </div>
    </Container>
  )
}