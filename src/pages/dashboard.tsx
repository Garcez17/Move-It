import Head from 'next/head';
import { useContext } from 'react';
import { GetServerSideProps } from 'next';

import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';

import ExperienceBar from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';

import { Container, Content } from '../styles/pages/Dashboard';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';
import { Sidebar } from '../components/Sidebar';
import { PlayerContext } from '../contexts/PlayerContext';
import { useSession } from 'next-auth/client';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function Dashboard() {
  const { player } = useContext(PlayerContext);
  const [session] = useSession();

  console.log(session);

  return (
    <Container>
      <Sidebar />
      <Content>
        <Head>
          <title>{player ? player.name : 'Início'} | move.it</title>
        </Head>
        <div>
          <ExperienceBar />

          <CountdownProvider>
            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>
        </div>
      </Content>
    </Container>
  )
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {}
  }
});
