import { useContext } from 'react';
import { ImTwitter } from 'react-icons/im';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import { Overlay, Container, Wrapper } from './styles';

export function LevelUpModal() {
  const { level, closeLevelUpModal } = useContext(ChallengesContext);

  return (
    <Overlay>
      <Container>
        <Wrapper>
          <header>{level}</header>

          <strong>Parabéns</strong>
          <p>Você alcançou um novo level.</p>

          <button onClick={closeLevelUpModal}>
            <img src="/icons/close.svg" alt="close"/>
          </button>
        </Wrapper>
        <button>
          Compartilhar no twitter
          <ImTwitter size={24} color="#2AA9E0" />
        </button>
      </Container>
    </Overlay>
  )
}