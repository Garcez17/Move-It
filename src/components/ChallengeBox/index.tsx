import { memo, useMemo } from 'react';
import { useChallenge } from '../../hooks/useChallenge';
import { useChallengesCountdown } from '../../hooks/useChallengesCountdown';
import { useCountdown } from '../../hooks/useCountdown';
import {
  Container,
  ChallengeActive,
  ChallengeNotActive,
  Button
} from './styles';

type ChallengeBoxProps = {
  resetCountdown: () => void;
  hasFinished: boolean;
}

function ChallengeBoxComponent({ hasFinished, resetCountdown }: ChallengeBoxProps) {
  const { activeChallenge, resetChallenge, completeChallenge, continueCycle } = useChallenge();
  const { hasBreak, cycle } = useChallengesCountdown();

  function handleChallengeSucceeded() {
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }

  function handleContinuePomodoro() {
    continueCycle();
    resetCountdown();
  }

  const strongTitle = useMemo(() => {
    if (cycle === 1) return 'Inicie um pomodoro clicando em inciar pomodoro.';

    if (cycle === 8) return 'Hora de um descanso maior!';

    if (hasBreak) return 'Hora do descanso!';

    return 'Finalize um ciclo para receber um desafio';
  }, [cycle, hasBreak]);

  const description = useMemo(() => {
    if (cycle === 1) return 'Ganhe xp ao finalizar todo o pomodoro ou completando desafios durante.';

    if (cycle === 8) return <>Você finalizou os 4 ciclos de foco. <br /> Agora merece um tempo maior de descanso, aproveite!</>;

    if (hasBreak) return <>Aproveite para tomar uma água ou fazer algo para comer.<br />Descanse.</>;

    return 'Ganhe xp completando desafios.';
  }, [cycle, hasBreak]);

  return(
    <Container>
      { activeChallenge ? (
        <ChallengeActive>
          <div>
            <header>Ganhe {activeChallenge.amount} xp</header>

            <main>
              {activeChallenge.type === 'body' ? (
                <img src="icons/body.svg"/>
              ) : (
                <img src="icons/eye.svg"/>
              )}
              <strong>Novo desafio</strong>
              <p>{activeChallenge.description}</p>
            </main>
          </div>
          

          <footer>
            <Button
              type="button"
              background="red"
              onClick={handleChallengeFailed}
            >
              Falhei
            </Button>
            <Button
              type="button"
              background="green"
              onClick={handleChallengeSucceeded}
            >
              Completei
            </Button>
          </footer>
        </ChallengeActive>
      ) : (
        <ChallengeNotActive>
          <article>
            <strong>{strongTitle}</strong>
            <p>
              <img src="icons/level-up.svg" alt="Level Up"/>
              {description}
            </p>
          </article>

          {hasBreak && cycle !== 8 && (
            <footer>
              {hasFinished && (
                <Button
                  type="button"
                  background="green"
                  onClick={handleContinuePomodoro}
                >
                  Prosseguir
                </Button>
              )}
            </footer>
          )}

          {cycle === 8  && (
            <footer>
              {hasFinished && (
                <Button
                  type="button"
                  background="green"
                  onClick={handleContinuePomodoro}
                >
                  Finalizar pomodoro
                </Button>
              )}
            </footer>
          )}
        </ChallengeNotActive>
      )}
    </Container>
  )
}

export const ChallengeBox = memo(ChallengeBoxComponent);