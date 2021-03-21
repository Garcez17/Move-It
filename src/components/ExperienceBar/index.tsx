import React, { useContext, useMemo } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import { PlayerContext } from '../../contexts/PlayerContext';

import { Container } from './styles';

const ExperienceBar: React.FC = () => {
  const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);
  const { player } = useContext(PlayerContext);

  const percentToNextLevel = useMemo(() => {
    if (player) {
      return Math.round(player.currentExperience * 100) / experienceToNextLevel;
    } else {
      return 0;
    }
  }, [experienceToNextLevel, player]);

  return (
    <Container>
      <span>0 xp</span> 
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />

        <span style={{ left: `${percentToNextLevel}%` }}>
          {player ? player.currentExperience : 0} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </Container>
  );
}

export default ExperienceBar;