import { useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Sidebar } from "../components/Sidebar";
import { PlayerContext } from '../contexts/PlayerContext';

import { Container, Content } from '../styles/pages/Leaderboard';

export default function Leaderboard() {
  const { players } = useContext(PlayerContext);
  
  return (
    <Container>
      <Head>
        <title>Leaderboard | move.it</title>
      </Head>
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
            {players.map(player => (
              <tr key={player.username}>
                <td>1</td>
                <td>
                  <img src={player.image_url} alt="Gabriel Garcez"/>
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
                  <span>{player.challengesCompleted}</span>
                  completados
                </td>
                <td>
                  <span>{player.currentExperience}</span>
                  xp
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Content>
    </Container>
  )
}