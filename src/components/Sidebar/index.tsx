import { useContext, useState } from 'react';
import Image from 'next/image';

import { ChallengesContext } from '../../contexts/ChallengesContext';

import Logo from '../../assets/logomarca.png';

import { Container, Bar } from './styles';
import { FiAward, FiHome } from 'react-icons/fi';

export function Sidebar() {
  const [page, setPage] = useState<'dash' | 'leader'>('dash');
  const { level } = useContext(ChallengesContext);

  return (
    <Container>
      <Image 
        src={Logo}
        width={48} height={42} 
        alt="Gabriel Garcez"
      />

      <section>
        <div>
          <a>
            {page === 'dash' && <Bar />}
            
            <FiHome color={page === 'dash' ? '#5965E0' : '#ACACAC'} />
          </a>
          <a>
            {page === 'leader' && <Bar />}
            <FiAward color={page === 'leader' ? '#5965E0' : '#ACACAC'} />
          </a>
        </div>
      </section>
    </Container>
  )
}