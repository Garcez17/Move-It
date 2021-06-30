import { query as q } from 'faunadb';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { fauna } from '../../../services/fauna';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIEND_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user',
    }),
  ],
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  callbacks: {
    async signIn(user, account, profile) {
      const { email, image, name } = user;

      const challenges_completed = 0;
      const current_experience = 0;
      const total_experience = 0;
      const level = 1;
      const coins = 0;
      const pomodoros_completed = 0;

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(email),
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              {
                data: { 
                  email,
                  image,
                  name,
                  level,
                  total_experience,
                  current_experience,
                  challenges_completed,
                  coins,
                  pomodoros_completed,
                }
              }
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(email),
              )
            )
          )
        )
  
        return true;
      } catch {
        return false;
      }
    }
  }
});
