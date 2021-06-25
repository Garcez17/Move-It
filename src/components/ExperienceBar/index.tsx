import React, { useMemo } from 'react';
import { useChallenge } from '../../contexts/ChallengesContext';

import { Container } from './styles';

export function ExperienceBar() {
  const { experienceToNextLevel, currentExperience } = useChallenge();

  const percentToNextLevel = useMemo(() => {
    return Math.round(currentExperience * 100) / experienceToNextLevel;
  }, [experienceToNextLevel, currentExperience]);

  return (
    <Container>
      <span>0 xp</span> 
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />

        <span style={{ left: `${percentToNextLevel}%` }}>
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </Container>
  );
}