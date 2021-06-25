import { ReactNode } from 'react';
import { Provider as NextAuthProvider } from 'next-auth/client';

interface AppProviderProps {
  children: ReactNode;
  session: any;
}

export function AppProvider({ children, session }: AppProviderProps) {
  return (
    <NextAuthProvider session={session}>
      {children}
    </NextAuthProvider>
  )
}