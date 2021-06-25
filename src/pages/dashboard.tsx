import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';

import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';
import { Sidebar } from '../components/Sidebar';

import { withSSRAuth } from '../utils/withSSRAuth';
import { loadUser } from './api/users';

import { Container, Content } from '../styles/pages/Dashboard';

type DashboardProps = {
  user: {
    email: string;
    image: string;
    name: string;
    level: number;
    total_experience: number;
    current_experience: number;
    challenges_completed: number;
  }
}

export default function Dashboard({ user }: DashboardProps) {
  return (
    <ChallengesProvider
      email={user.email}
      level={user.level}
      currentExperience={user.current_experience}
      challengesCompleted={user.challenges_completed}
      total_experience={user.total_experience}
    >
      <Container>
        <Sidebar />
        <Content>
          <Head>
            <title>{user.name} | move.it</title>
          </Head>
          <div>
            <ExperienceBar />

            <CountdownProvider>
              <section>
                <div>
                  <Profile
                    image_url={user.image}
                    name={user.name}
                  />
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
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  const user = await loadUser(ctx.req);

  return {
    props: {
      user: user.data,
    }
  }
});
