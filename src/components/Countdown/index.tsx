import { useContext, useEffect, useMemo, useState } from 'react';
import { CountdownContext } from '../../contexts/CountdownContext';
import { Container, Button } from './styles';

export function Countdown() {
  const { minutes, seconds, hasFinished, resetCountdown, isActive, startCountdown } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = useMemo(() => {
    return String(minutes).padStart(2, '0').split('');
  }, [minutes]);

  const [secondLeft, secondRight] = useMemo(() => {
    return String(seconds).padStart(2, '0').split('');
  }, [seconds]);
  
  return (
    <div>
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
        <Button 
          disabled
          onClick={resetCountdown}
        >
          Ciclo encerrado!
        </Button>
      ) : (
        <>
          { isActive ? (
            <Button 
              type="button"
              active
              onClick={resetCountdown}
            >
              Abandonar ciclo
            </Button>
          ) : (
            <Button 
              type="button"
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </Button>
          ) }
        </>
      ) }
    </div>
  )
}