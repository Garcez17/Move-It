import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;

  background: var(--background-secondary);
  border-radius: 5px;
  box-shadow: ${props => props.theme.title === 'light' ? '0 0 60px rgba(0, 0, 0, 0.05)' : ''};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
`;

export const ChallengeNotActive = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  article {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    
    strong {
      font-size: 1.5rem;
      font-weight: 500;
      line-height: 1.4;
    }

    p {
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1.4;
      max-width: 90%;
      margin-top: 3rem;

      > img {
        margin-bottom: 1rem;
      }
    }
  }

  footer {
    width: 100%;
    height: 80px;
    border-radius: 50%;

    button {
      border-radius: 0 0 5px 5px;
    }
  }
`;

export const ChallengeActive = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;

  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 25px 64px;

    > header {
      color: var(--blue);
      width: 100%;
      font-weight: 600;
      font-size: 1.25rem;
      padding: 0 2rem 1.5rem;
      border-bottom: 1px solid var(--gray-line);
    }

    > main {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      strong {
        font-size: 2rem;
        font-weight: 600;
        color: var(--title);
        margin: 1.5rem 0 1rem;
      }

      p {
        line-height: 1.5;
        color: ${props => props.theme.title === 'dark' ? '#999999' : ''};
      }
    }
  }

  > footer {
    width: 100%;
    height: 80px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-radius: 50%;

    button + button {
      border-left: 1px solid var(--gray-line);
    }

    button:first-child {
      border-radius: 0 0 0 5px;
    }
    button:last-child {
      border-radius: 0 0 5px 0;
    }
  }
`;

interface ButtonProps {
  background: string;
}

export const Button = styled.button<ButtonProps>`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;

  color: ${props => props.background === 'red' ? 'var(--red)' : 'var(--green)'};
  background: ${props => props.background === 'red' ? 'var(--button-red)' : 'var(--button-green)'};

  font-size: 1rem;
  font-weight: 600;
  border-top: 1px solid var(--gray-line);

  transition: filter 0.2s;

  :hover {
    filter: brightness(0.9);
  }
`;