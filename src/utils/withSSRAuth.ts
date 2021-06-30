import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    console.log(typeof cookies[process.env.SESSION_TOKEN]);
    
    if (!cookies[process.env.SESSION_TOKEN]) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }

    return fn(ctx);
  }
}