import { useMemo } from 'react';
import { BsPlayFill } from 'react-icons/bs';
import { FiX } from 'react-icons/fi';
import { HiCheckCircle } from 'react-icons/hi';

import { SEO } from '../SEO';

import { useChallengesCountdown } from '../../hooks/useChallengesCountdown';
import { useCountdown } from '../../hooks/useCountdown';

import { Container, Button, ProgressBar, Bar } from './styles';

export function Countdown() {
  const { 
    minutes, 
    seconds, 
    totalTime, 
    hasFinished, 
    resetCountdown, 
    isActive, 
    startCountdown 
  } = useCountdown();

  const { cycle } = useChallengesCountdown();

  const [minuteLeft, minuteRight] = useMemo(() => {
    return String(minutes).padStart(2, '0').split('');
  }, [minutes]);

  const [secondLeft, secondRight] = useMemo(() => {
    return String(seconds).padStart(2, '0').split('');
  }, [seconds]);

  const progressTime = useMemo(() => {
    const timeByOneSecond = totalTime * 1000;
    const timeByLessThanOneSecond = totalTime * 960;
    const totalInMiliseconds = timeByOneSecond - (timeByOneSecond - timeByLessThanOneSecond);

    return totalInMiliseconds / 1000;
  }, [totalTime]);

  return (
    <div>
      {isActive && (
        <SEO 
          title={`${minuteLeft}${minuteRight}:${secondLeft}${secondRight} - Ciclo ${cycle}/6`}
          shouldIndexPage={false}
        />
      )}
      <Container>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </Container>

      { hasFinished ? (
        <>
          <Button 
            disabled
            onClick={resetCountdown}
          >
            Ciclo encerrado!
            <HiCheckCircle color="#4cd62b" />
          </Button>
          <ProgressBar active>
            <Bar time={progressTime} />
          </ProgressBar>
        </>
      ) : (
        <>
          { isActive ? (
            <>
              <Button 
                type="button"
                active
                onClick={resetCountdown}
              >
                Abandonar ciclo
                <FiX />
              </Button>
              <ProgressBar active>
                <Bar time={progressTime} />
              </ProgressBar>
            </>
          ) : (
            <>
              <Button 
                type="button"
                onClick={startCountdown}
              >
                {cycle === 1 ? 'Iniciar pomodoro' : cycle % 2 === 0 ? 'Iniciar descanso' : 'Iniciar ciclo'}
                <BsPlayFill />
              </Button>
              <ProgressBar />
            </>
          ) }
        </>
      ) }
    </div>
  )
}
