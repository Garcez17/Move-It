import { useChallenge } from '../../contexts/ChallengesContext';
import { useChallengesCountdown } from '../../contexts/ChallengesCoundownContext';
import { useCountdown } from '../../contexts/CountdownContext';
import {
  Container,
  ChallengeActive,
  ChallengeNotActive,
  Button
} from './styles';

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge, continueCycle } = useChallenge();
  const { resetCountdown, hasFinished } = useCountdown();
  const { hasBreak } = useChallengesCountdown();

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
      ) : hasBreak ? (
        <ChallengeNotActive>
          <article>
            <strong>Hora do descanso!</strong>
            <p>
              <img src="icons/level-up.svg" alt="Level Up"/>
              Aproveite para tomar uma água ou fazer algo para comer. <br /> Descanse.
            </p>
          </article>
          
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
        </ChallengeNotActive>
      ) : (
        <ChallengeNotActive>
          <article>
            <strong>Finalize um ciclo para receber um desafio</strong>
            <p>
              <img src="icons/level-up.svg" alt="Level Up"/>
              Avance de level completando desafios.
            </p>
          </article>
        </ChallengeNotActive>
      )}
    </Container>
  )
}