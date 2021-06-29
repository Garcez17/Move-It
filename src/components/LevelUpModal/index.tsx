// import { ImTwitter } from 'react-icons/im';
import Modal from 'react-modal';
import { useChallenge } from '../../contexts/ChallengesContext';
import { Overlay, Container, Wrapper } from './styles';

type LevelUpModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function LevelUpModal({ isOpen, onRequestClose }: LevelUpModalProps) {
  const { level, closeLevelUpModal } = useChallenge();

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
          <header>{level}</header>

          <strong>Parabéns</strong>
          <p>Você alcançou um novo level.</p>

          <button onClick={closeLevelUpModal}>
            <img src="/icons/close.svg" alt="close"/>
          </button>
        </Wrapper>
        {/* <button>
          Compartilhar no twitter
          <ImTwitter size={24} color="#2AA9E0" />
        </button> */}
      </Container>
    </Modal>
  )
}