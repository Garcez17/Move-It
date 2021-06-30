import { useMemo } from 'react';
import { FiCheck } from 'react-icons/fi';
import { useChallenge } from '../../contexts/ChallengesContext';
import { useChallengesCountdown } from '../../contexts/ChallengesCoundownContext';
import { useCountdown } from '../../contexts/CountdownContext';
import { Container, Info, Pomodoro, Workbar, Breakbar } from './styles';

export function CompletedChallenges() {
  const { challengesCompleted, pomodorosCompleted } = useChallenge();
  const { pomodoro } = useCountdown();
  const { cycle } = useChallengesCountdown();

  const challangesComplete= useMemo(() => {
    return String(challengesCompleted).padStart(2, '0').split('');
  }, [challengesCompleted]);
  
  return (
    <Container>
      <Info>
        <span>Desafios completos</span>
        <span>{challangesComplete}</span>
      </Info>
      <Info>
        <span>Pomodoros finalizados</span>
        <span>{pomodorosCompleted}</span>
      </Info>
      <Pomodoro>
        <header>
          <span>Ciclo atual</span>
          <span>{cycle % 2 === 0 ? 'Descanso' : 'Foco'}</span>
        </header>
        <div>
          {pomodoro && (
            <>
              <Workbar>
                <p>{cycle > 1 ? <FiCheck size={32} /> : `${pomodoro.pom_time} min`}</p>
              </Workbar>
              <Breakbar>
                <p>{cycle > 2 ? <FiCheck size={24} /> : `${pomodoro.pom_break} min` }</p>
              </Breakbar>
              <Workbar>
                <p>{cycle > 3 ? <FiCheck size={32} /> : `${pomodoro.pom_time} min`}</p>
              </Workbar>
              <Breakbar>
                <p>{cycle > 4 ? <FiCheck size={24} /> : `${pomodoro.pom_break} min` }</p>
              </Breakbar>
              <Workbar>
                <p>{cycle > 5 ? <FiCheck size={32} /> : `${pomodoro.pom_time} min`}</p>
              </Workbar>
              <Breakbar>
                <p>{cycle > 6 ? <FiCheck size={24} /> : `${pomodoro.pom_break} min` }</p>
              </Breakbar>
              <Workbar>
                <p>{cycle > 7 ? <FiCheck size={32} /> : `${pomodoro.pom_time} min`}</p>
              </Workbar>
              <Breakbar>
                <p>{cycle > 8 ? <FiCheck size={24} /> : `${pomodoro.pom_time + 5} min` }</p>
              </Breakbar>
            </>
          )}
        </div>
      </Pomodoro>
    </Container>
  )
}
