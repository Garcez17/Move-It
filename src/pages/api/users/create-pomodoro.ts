import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { fauna } from "../../../services/fauna";
import { query as q } from 'faunadb';

type User = {
  ref: {
    id: string;
  };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { pom_time, pom_break, user_id } = req.body;

  // const session = await getSession({ req });

  const createPomodoro = await fauna.query(
    q.Create(
      q.Collection('pomodoros'),
      {
        data: { 
          pom_time,
          pom_break,
          user_id
        }
      }
    ),
  )

  return res.status(201).json(createPomodoro);
}