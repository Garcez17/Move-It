import { getSession } from "next-auth/client";
import { fauna } from "../../../services/fauna";
import { query as q } from 'faunadb';
import { IncomingMessage } from "node:http";
import { NextApiRequestCookies } from "next/dist/next-server/server/api-utils";
import { NextApiRequest, NextApiResponse } from "next";

export type User = {
  ref: {
    id: string;
  };
  data: {
    email: string;
    image: string;
    name: string;
    level: number;
    total_experience: number;
    current_experience: number;
    challenges_completed: number;
  }
}

type Users = {
  data: User[];
}

type Req = IncomingMessage & {
  cookies: NextApiRequestCookies;
}

export async function loadUser(req: Req) {
  const session = await getSession({ req });

  const user = await fauna.query<User>(
    q.Get(
      q.Match(
        q.Index('user_by_email'),
        q.Casefold(session.user.email)
      )
    )
  );

  return user;
}

export async function loadUsers() {
  const users = await fauna.query<Users>(
    q.Map(
      q.Paginate(
        q.Match(q.Index("all_users"))
      ),
      q.Lambda("X", q.Get(q.Var("X")))
    )
  );

  return users;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { level, total_experience, current_experience, challenges_completed, email } = req.body;

  const user = await fauna.query<User>(
    q.Get(
      q.Match(
        q.Index('user_by_email'),
        q.Casefold(email)
      )
    )
  );

  const updatedUser = await fauna.query<User>(
    q.Update(
      q.Ref(q.Collection('users'), user.ref.id),
      { data: { level, total_experience, current_experience, challenges_completed } },
    )
  );

  return res.status(200).json(updatedUser);
}