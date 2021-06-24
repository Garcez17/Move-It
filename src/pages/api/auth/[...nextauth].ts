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
  callbacks: {
    async signIn(user, account, profile) {
      const { email, image, name } = user;

      const challenges_completed = 0;
      const current_experience = 0;
      const total_experience = 0;
      const level = 1;

      await fauna.query(
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
            }
          }
        )
      )

      return true;
    }
  }
});
