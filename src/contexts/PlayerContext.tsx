import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import Cookies from 'js-cookie';

interface Player {
  username: string;
  name: string;
  image_url: string;
  level: number;
  currentExperience: number;
  total_experience: number;
  challengesCompleted: number;
}

interface PlayerContextData {
  findPlayer: (player_name: string) => void;
  addPlayer: (player_name: string) => void;
  updatePlayer: (player_name: string, amountXP: number,experienceToNextLevel: number) => void;
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

  useEffect(() => {
    if (player) {
      Cookies.set('player', JSON.stringify(player));
      Cookies.set('players', JSON.stringify(players));
    }
  }, [player, players]);

  const findPlayer = useCallback((player_username: string) => {
    if (response) {
      const findPlayer = playersInCookie.find(
        playerInCokkie => {
          return playerInCokkie.username.toLowerCase() === player_username.toLowerCase();
        },
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
      total_experience: 0,
    }
    setPlayer(player);

    const newArr = players;

    newArr.push(player);

    setPlayers(newArr);

    Cookies.set('players', JSON.stringify(players));
    Cookies.set('player', JSON.stringify(player));
  }, []);

  const updatePlayer = useCallback((player_username: string, amountXP: number, experienceToNextLevel: number) => {
    const { currentExperience, total_experience } = player;

    let finalExperience = currentExperience + amountXP;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;

      const newPlayers = players.map(player => player.username.toLowerCase() === player_username.toLowerCase() ? {
        ...player,
        currentExperience: finalExperience,
        challengesCompleted: player.challengesCompleted + 1,
        total_experience: total_experience + amountXP,
        level: player.level + 1,
      } : player);

      newPlayers.sort(function compare(player1, player2) {
        if (player1.total_experience > player2.total_experience) return -1;
        if (player1.total_experience < player2.total_experience) return 1;
        return 0;
      });
  
      setPlayer({
        ...player,
        challengesCompleted: player.challengesCompleted + 1,
        currentExperience: finalExperience,
        total_experience: total_experience + amountXP,
        level: player.level + 1,
      });
      setPlayers(newPlayers);
    } else {
      const newPlayers = players.map(player => player.username.toLowerCase() === player_username.toLowerCase() ? {
        ...player,
        currentExperience: finalExperience,
        challengesCompleted: player.challengesCompleted + 1,
        total_experience: total_experience + amountXP,
      } : player);

      newPlayers.sort(function compare(player1, player2) {
        if (player1.total_experience > player2.total_experience) return -1;
        if (player1.total_experience < player2.total_experience) return 1;
        return 0;
      });
  
      setPlayer({
        ...player,
        currentExperience: finalExperience,
        challengesCompleted: player.challengesCompleted + 1,
        total_experience: total_experience + amountXP,
      });
      setPlayers(newPlayers);
    }
  }, [player]);

  return (
    <PlayerContext.Provider value={{
      addPlayer,
      findPlayer,
      player,
      players,
      updatePlayer,
    }}>
      {children}
    </PlayerContext.Provider>
  )
}