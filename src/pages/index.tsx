import Head from 'next/head';
import Image from 'next/image';
import { signIn } from 'next-auth/client';

import { AiFillGithub } from 'react-icons/ai';

import { SignInWithGithub } from '../components/SignInWithGithub';

import { Container, Content, Wrapper } from '../styles/pages/Home';
import { useRouter } from 'next/router';
import { withSSRGuest } from '../utils/withSSRGuest';

export default function Home() {
  const router = useRouter();

  async function handleSingIn() {
    await signIn('github');

    router.push('/dashboard');
  }

  return (
    <Container>
      <Head>
        <title>Login | move.it</title>
      </Head>

      <Image src="/back-logo.svg" width={768} height={600} />
      <Content>
        <Wrapper>
          <Image src="/logo.png" width={360} height={72} />

          <div>
            <h1>Bem-vindo</h1>

            <div>
              <AiFillGithub color="#B2B9FF" />
              <p>
                Faça login com seu Github para começar
              </p>
            </div>

            <SignInWithGithub onClick={handleSingIn} />
          </div>
        </Wrapper>
      </Content>
    </Container>
  )
}

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {}
  }
})
