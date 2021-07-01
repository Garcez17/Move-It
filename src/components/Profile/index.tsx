import { memo } from 'react';
import { useChallenge } from '../../hooks/useChallenge';

import { Container } from './styles';

type ProfileProps = {
  image_url: string;
  name: string;
}

function ProfileComponent({ image_url, name }: ProfileProps) {
  const { level } = useChallenge();

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

export const Profile = memo(ProfileComponent);
