import { useChallenge } from '../../contexts/ChallengesContext';
import { useCountdown } from '../../contexts/CountdownContext';
import {
  Container,
  ChallengeActive,
  ChallengeNotActive,
  Button
} from './styles';

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useChallenge();
  const { resetCountdown } = useCountdown();

  function handleChallengeSucceeded() {
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
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
      ) : (
        <ChallengeNotActive>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up"/>
            Avance de level completando desafios.
          </p>
        </ChallengeNotActive>
      )}
    </Container>
  )
}