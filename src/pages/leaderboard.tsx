import Head from 'next/head';
import { SEO } from '../components/SEO';
import { Sidebar } from "../components/Sidebar";

import { Container, Content } from '../styles/pages/Leaderboard';
import { withSSRAuth } from '../utils/withSSRAuth';
import { loadUsers } from './api/users';

type LeaderboardProps = {
  users: Array<{
    id: string;
    email: string;
    image: string;
    name: string;
    level: number;
    total_experience: number;
    current_experience: number;
    challenges_completed: number;
  }>
}

export default function Leaderboard({ users }: LeaderboardProps) {
  return (
    <Container>
      <SEO
        title="Leaderboard"
        shouldIndexPage={false}
      />
      <Sidebar />

      <Content>
        <h1>Leaderboard</h1>

        <table>
          <thead>
            <tr>
              <th>POSIÇÃO</th>
              <th>USUÁRIO</th>
              <th>DESAFIOS</th>
              <th>EXPERIÊNCIA</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((player, index) => (
                <tr key={player.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={player.image} alt={player.name}/>
                    <div>
                      <strong>
                        {player.name}
                      </strong>
                      <span>
                        <img src='icons/level.svg' width={14} height={16} />
                        Level {player.level}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span>{player.challenges_completed}</span>
                    completados
                  </td>
                  <td>
                    <span>{player.total_experience}</span>
                    xp
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>1</td>
                <td>dale</td>
              </tr>
            )}
          </tbody>
        </table>
      </Content>
    </Container>
  )
}

export const getServerSideProps = withSSRAuth(async () => {
  const users = await loadUsers();

  const filteredUsers = users.data.map(user => {
    const { id } = user.ref;
    return {
      id,
      ...user.data,
    }
  });

  return {
    props: {
      users: filteredUsers,
    }
  }
});
