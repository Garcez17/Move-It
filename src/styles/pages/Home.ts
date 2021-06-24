import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background: var(--blue);
  height: 100vh;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  > div {
    margin-top: 6rem;

    h1 {
      font-size: 2.2rem;
      font-weight: 600;
      color: var(--white);
      margin-bottom: 24px;
    }

    div {
      display: flex;

      > svg {
        width: 40px;
        height: 40px;
        margin-right: 24px;
      }

      > p {
        max-width: 254px;
        display: flex;
        align-items: center;
        font-size: 20px;
        font-weight: 500;
        color: var(--text-highlight);
      }
    }

    form {
      display: flex;
      margin-top: 32px;
    }
  }
`;
