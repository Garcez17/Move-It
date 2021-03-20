import Head from 'next/head';
import Image from 'next/image';
import { Sidebar } from "../components/Sidebar";

import { Container, Content } from '../styles/pages/Leaderboard';

export default function Leaderboard() {
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
            <tr>
              <td>1</td>
              <td>
                <img src="https://github.com/garcez17.png" alt="Gabriel Garcez"/>
                <div>
                  <strong>
                    Gabriel Garcez
                  </strong>
                  <span>
                    <img src='icons/level.svg' width={14} height={16} />
                    Level 36
                  </span>
                </div>
              </td>
              <td>
                <span>127</span>
                completados
              </td>
              <td>
                <span>15400</span>
                xp
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <img src="https://github.com/garcez17.png" alt="Gabriel Garcez"/>
                <div>
                  <strong>
                    Gabriel Garcez
                  </strong>
                  <span>
                    <img src='icons/level.svg' width={14} height={16} />
                    Level 36
                  </span>
                </div>
              </td>
              <td>
                <span>127</span>
                completados
              </td>
              <td>
                <span>15400</span>
                xp
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                <img src="https://github.com/garcez17.png" alt="Gabriel Garcez"/>
                <div>
                  <strong>
                    Tiago Luchtenberg
                  </strong>
                  <span>
                    <img src='icons/level.svg' width={14} height={16} />
                    Level 36
                  </span>
                </div>
              </td>
              <td>
                <span>127</span>
                completados
              </td>
              <td>
                <span>15400</span>
                xp
              </td>
            </tr>
            
          </tbody>
        </table>
      </Content>
    </Container>
  )
}