import { useCallback, useContext, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { PlayerContext } from '../contexts/PlayerContext';
import { FiArrowRight } from 'react-icons/fi';

import { AiFillGithub } from 'react-icons/ai';

import backgroundLogo from '../assets/back-logo.svg';
import logoImg from '../assets/logo.png';
import {Button} from '../components/Button';
import Input from '../components/Input';

import { Container, Content, Wrapper } from '../styles/pages/Home';

export default function Home() {
  const [username, setUsername] = useState('');

  const { findPlayer } = useContext(PlayerContext);

  function handleSubmit() {
    findPlayer(username);
  }

  return (
    <Container>
      <Head>
        <title>Login | move.it</title>
      </Head>

      <Image src={backgroundLogo} width={768} height={600} />
      <Content>
        <Wrapper>
          <Image src={logoImg} width={360} height={72} />

          <div>
            <h1>Bem-vindo</h1>

            <div>
              <AiFillGithub color="#B2B9FF" />
              <p>
                Faça login com seu Github para começar
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <Input name="username" setUsername={setUsername} />
              <Link href="/dashboard">
                <a>
                  <Button>
                    <FiArrowRight color="#fff" />
                  </Button>
                </a>
              </Link>
            </form>
          </div>
        </Wrapper>
      </Content>
    </Container>
  )
}
