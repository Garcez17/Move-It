import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
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
  const response = Cookies.get('players');

  let playersInCookie = [];
    
  if (response) {
    playersInCookie = JSON.parse(response) as Player[];
  }

  const [player, setPlayer] = useState<Player>(null);
  const [players, setPlayers] = useState<Player[]>(playersInCookie);

  useEffect(() => {
    const response = Cookies.get('player');

    if (response) {
      const playerInCookie = JSON.parse(response) as Player;
  
      setPlayer(playerInCookie);
    }
  }, []);

  const findPlayer = useCallback((player_username: string) => {
    if (response) {
      const findPlayer = playersInCookie.find(
        playerInCokkie => playerInCokkie.username.localeCompare(player_username, { sensitivity: 'base' }),
      ) as Player;

      if (!findPlayer) addPlayer(player_username);

      setPlayer(findPlayer);
      setPlayers(playersInCookie);
    } else {
      addPlayer(player_username);
    }
  }, []);

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
    setPlayer(player);

    const newArr = players;

    newArr.push(player);

    setPlayers(newArr);

    Cookies.set('players', JSON.stringify(players));
    Cookies.set('player', JSON.stringify(player));
  }, []);

  const updatePlayer = useCallback((player_username) => {

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