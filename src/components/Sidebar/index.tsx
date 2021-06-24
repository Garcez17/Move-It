import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/client';


import { ChallengesContext } from '../../contexts/ChallengesContext';

import Logo from '../../assets/logomarca.png';

import { Container, Bar } from './styles';
import { FiAward, FiHome } from 'react-icons/fi';

export function Sidebar() {
  const router = useRouter();
  const [page, setPage] = useState(router.pathname);

  useEffect(() => {
    setPage(router.pathname);
  }, [router.pathname]);

  async function handleSignOut() {
    await signOut();

    router.push('/');
  }

  return (
    <Container>
      <Image 
        src={Logo}
        width={48} height={42} 
        alt="Gabriel Garcez"
      />

      <section>
        <div>
          <Link href="/dashboard">
            <a>
              {page === '/dashboard' && <Bar />}
              
              <FiHome color={page === '/dashboard' ? '#5965E0' : '#ACACAC'} />
            </a>
          </Link>
          <Link href="/leaderboard">
            <a>
              {page === '/leaderboard' && <Bar />}
              <FiAward color={page === '/leaderboard' ? '#5965E0' : '#ACACAC'} />
            </a>
          </Link>
        </div>
      </section>
      <button onClick={handleSignOut}>Sair</button>
    </Container>
  )
}