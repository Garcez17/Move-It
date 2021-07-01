import React, { memo, useMemo } from 'react';

import { useChallenge } from '../../hooks/useChallenge';

import { Container } from './styles';

function ExperienceBarComponent() {
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

export const ExperienceBar = memo(ExperienceBarComponent);