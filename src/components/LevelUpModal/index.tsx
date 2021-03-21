import { useContext } from 'react';
import { ImTwitter } from 'react-icons/im';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import { PlayerContext } from '../../contexts/PlayerContext';
import { Overlay, Container, Wrapper } from './styles';

export function LevelUpModal() {
  const { closeLevelUpModal } = useContext(ChallengesContext);
  const { player } = useContext(PlayerContext);

  return (
    <Overlay>
      <Container>
        <Wrapper>
          <header>{player ? player.level : 'Carregando...'}</header>

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