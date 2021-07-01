import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { SEO } from '../components/SEO';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { Loading } from '../components/Loading';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';
import { Sidebar } from '../components/Sidebar';
import { WelcomeModalProps } from '../components/WelcomeModal';

import { withSSRAuth } from '../utils/withSSRAuth';
import { loadUser } from './api/users';

import { Container, Content } from '../styles/pages/Dashboard';
import { useCountdown } from '../hooks/useCountdown';
import { useChallenge } from '../hooks/useChallenge';

const WelcomeModal = dynamic<WelcomeModalProps>(() => {
  return import('../components/WelcomeModal').then(mod => mod.WelcomeModal);
});

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
  const { 
    pomodoro, 
    handleAddPomodoro, 
    collectData: countdownCollectData, 
    loading: countdownLoading, 
    hasFinished,
    resetCountdown 
  } = useCountdown();

  const { collectData, loading: challengeLoading } = useChallenge();

  useEffect(() => {
    collectData({
      email: user.email,
      level: user.level,
      pomodoros_completed: user.pomodoros_completed,
      current_experience: user.current_experience,
      total_experience: user.total_experience,
      challenges_completed: user.challenges_completed,
    });

    countdownCollectData({
      pomodoro: pomodoroData,
    })
  }, []);

  if (challengeLoading || countdownLoading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        <SEO title={user.name} shouldIndexPage={false} />

        <div>
          <ExperienceBar />

            {!pomodoro && <WelcomeModal userId={user.id} pomodoro={pomodoro} handleAddPomodoro={handleAddPomodoro} />}
            <section>
              <div>
                <Profile
                  image_url={user.image}
                  name={user.name}
                />
                <CompletedChallenges pomodoro={pomodoro} />
                <Countdown />
              </div>
              <div>
                <ChallengeBox hasFinished={hasFinished} resetCountdown={resetCountdown} />
              </div>
            </section>
        </div>
      </Content>
    </Container>
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
