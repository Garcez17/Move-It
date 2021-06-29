import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { FiAward, FiHome, FiLogOut, FiMoon, FiSun } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/client';

import Logo from '../../assets/logomarca.png';

import { useTheme } from '../../hooks/useTheme';

import { Container, Bar, Button } from './styles';

const Switch = dynamic(() => {
  return import('react-switch');
});

export function Sidebar() {
  const router = useRouter();
  const [page, setPage] = useState(router.pathname);
  const { theme, toogleTheme } = useTheme();

  useEffect(() => {
    setPage(router.pathname);
  }, [router.pathname]);

  async function handleSignOut() {
    await signOut();

    router.push('/');
  }

  return (
    <Container>
      <div>
        <Image
          src={Logo}
          width={48} 
          height={42} 
          alt="Gabriel Garcez"
        />

        {theme && (
          <Switch
            className="switch"
            onColor="#5965e0"
            offColor="#ACACAC"
            checked={theme === 'dark'}
            onChange={toogleTheme}
            checkedIcon={<FiSun color="#f2f3f5" size={22} />}
            uncheckedIcon={<FiMoon color="#f2f3f5" size={22} />}
            height={24}
            width={70}
            handleDiameter={32}
          />
        )}
      </div>

      <section>
        <Link href="/dashboard" passHref>
          <Button>
            {page === '/dashboard' && <Bar />}
            
            <FiHome color={page === '/dashboard' ? '#5965E0' : 'var(--gray)'} />
          </Button>
        </Link>
        <Link href="/leaderboard" passHref>
          <Button>
            {page === '/leaderboard' && <Bar />}
            <FiAward color={page === '/leaderboard' ? '#5965E0' : 'var(--gray)'} />
          </Button>
        </Link>
      </section>
      
      <Button onClick={handleSignOut}>
        <FiLogOut color="#ACACAC" />
      </Button>
    </Container>
  )
}