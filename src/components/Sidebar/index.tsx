import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/client';

import Logo from '../../assets/logomarca.png';

import { Container, Bar, Button } from './styles';
import { FiAward, FiHome, FiLogOut } from 'react-icons/fi';

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
        <Link href="/dashboard" passHref>
          <Button>
            {page === '/dashboard' && <Bar />}
            
            <FiHome color={page === '/dashboard' ? '#5965E0' : '#ACACAC'} />
          </Button>
        </Link>
        <Link href="/leaderboard" passHref>
          <Button>
            {page === '/leaderboard' && <Bar />}
            <FiAward color={page === '/leaderboard' ? '#5965E0' : '#ACACAC'} />
          </Button>
        </Link>
      </section>
      
      <Button onClick={handleSignOut}>
        <FiLogOut color="#ACACAC" />
      </Button>
    </Container>
  )
}