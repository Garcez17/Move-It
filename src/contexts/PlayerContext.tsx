import { createContext, ReactNode, useCallback, useState } from "react";
import Cookies from 'js-cookie';

interface Player {
  username: string;
  name: string;
  image_url: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

interface PlayerContextData {
  findPlayer: (player_name: string) => void;
  addPlayer: (player_name: string) => void;
  player: Player;
  players: Player[];
}

export const PlayerContext = createContext({} as PlayerContextData);

interface PlayerProviderProps {
  children: ReactNode;
}

export function PlayerProvider({ children }: PlayerProviderProps ) {
  const [player, setPlayer] = useState<Player>(null);
  const [players, setPlayers] = useState<Player[]>([]);

  const findPlayer = useCallback((player_username: string) => {
    const response = Cookies.get('players');

    if (response) {
      const playersInCookie = JSON.parse(response) as Player[];

      const findPlayer = playersInCookie.find(
        playerInCokkie => playerInCokkie.username === player_username,
      );

      if (!findPlayer) addPlayer(player_username);
  
      setPlayer(findPlayer);
      setPlayers(playersInCookie);
    } else {
      addPlayer(player_username);
    }
  }, [])

  const addPlayer = useCallback(async (player_username: string) => {
    const response = await fetch(`https://api.github.com/users/${player_username}`);
    const data = await response.json();

    const player = {
      username: data.login,
      name: data.name,
      image_url: data.avatar_url,
      level: 1,
      challengesCompleted: 0,
      currentExperience: 0,
    }

    const newArr = players;

    newArr.push(player);

    setPlayers(newArr);

    Cookies.set('players', JSON.stringify(players));
    Cookies.set('player', JSON.stringify(player));
  }, []);

  return (
    <PlayerContext.Provider value={{
      addPlayer,
      findPlayer,
      player,
      players,
    }}>
      {children}
    </PlayerContext.Provider>
  )
}