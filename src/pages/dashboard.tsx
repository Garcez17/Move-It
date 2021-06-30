import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider, useCountdown } from '../contexts/CountdownContext';

import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';
import { Sidebar } from '../components/Sidebar';
import { WelcomeModal } from '../components/WelcomeModal';

import { withSSRAuth } from '../utils/withSSRAuth';
import { loadUser } from './api/users';

import { Container, Content } from '../styles/pages/Dashboard';

type DashboardProps = {
  user: {
    id: string;
    email: string;
    image: string;
    name: string;
    level: number;
    total_experience: number;
    current_experience: number;
    challenges_completed: number;
    pomodoros_completed: number;
    coins: number;
  };
  pomodoroData: {
    pom_time: number;
    pom_break: number;
    user_id: string;
  };
}

export default function Dashboard({ user, pomodoroData }: DashboardProps) {
  const { pomodoro } = useCountdown();

  return (
    <ChallengesProvider
      email={user.email}
      level={user.level}
      pomodoros_completed={user.pomodoros_completed}
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

            <CountdownProvider pomodoroData={pomodoroData}>
              {!pomodoro && <WelcomeModal userId={user.id} />}
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
  const { user, pomodoro } = await loadUser(ctx.req);

  const { id: user_id } = user.ref;

  const userData = {
    id: user_id,
    ...user.data,
  }

  if (pomodoro) {
    const { id: pomodoro_id } = pomodoro?.ref;
  
    const pomodoroData = {
      pomodoro_id,
      ...pomodoro.data,
    }
  
    return {
      props: {
        user: userData,
        pomodoroData: pomodoroData,
      }
    }
  } else {
    return {
      props: {
        user: userData,
        pomodoroData: null,
      } 
    }
  }
});
