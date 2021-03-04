import { useContext, useMemo } from 'react';
import { BsPlayFill } from 'react-icons/bs';
import { FiX } from 'react-icons/fi';
import { HiCheckCircle } from 'react-icons/hi';

import { CountdownContext } from '../../contexts/CountdownContext';
import { Container, Button, ProgressBar, Bar } from './styles';

export function Countdown() {
  const { minutes, seconds, totalTime, hasFinished, resetCountdown, isActive, startCountdown } = useContext(CountdownContext);

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
        <>
          <Button 
            disabled
            onClick={resetCountdown}
          >
            Ciclo encerrado!
            <HiCheckCircle color="#4cd62b" />
          </Button>
          <ProgressBar active>
            <Bar time={totalTime} />
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
                <FiX color="#2e384d" />
              </Button>
              <ProgressBar active>
                <Bar time={totalTime} />
              </ProgressBar>
            </>
          ) : (
            <>
              <Button 
                type="button"
                onClick={startCountdown}
              >
                Iniciar um ciclo
                <BsPlayFill color="#fff" />
              </Button>
              <ProgressBar />
            </>
          ) }
        </>
      ) }
    </div>
  )
}