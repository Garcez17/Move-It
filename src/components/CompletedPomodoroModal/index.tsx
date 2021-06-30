// import { ImTwitter } from 'react-icons/im';
import Modal from 'react-modal';
import { useChallenge } from '../../contexts/ChallengesContext';
import { Container, Wrapper } from './styles';

type CompletedPomodoroModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function CompletedPomodoroModal({ isOpen, onRequestClose }: CompletedPomodoroModalProps) {
  const { closeCompletePomodoroModal } = useChallenge();

  return (
    <Modal
      isOpen={isOpen} 
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container>
        <Wrapper>
          <header>🎉</header>

          <strong>Parabéns</strong>
          <p>Você completou o pomodoro e como recompensa recebeu 250xp</p>
        </Wrapper>
        <button onClick={closeCompletePomodoroModal}>
          Continuar
        </button>
      </Container>
    </Modal>
  )
}