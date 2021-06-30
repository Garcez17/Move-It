import styled from 'styled-components';

export const Container = styled.div`
  background: var(--background-secondary);
  width: 100%;
  max-width: 400px;
  
  border-radius: 5px;
  box-shadow: ${props => props.theme.title === 'light' ? '0 0 60px rgba(0, 0, 0, 0.05)' : ''};
  position: relative;
  z-index: 99;

  > button {
    width: 100%;
    padding: 28px 0;
    border: 0;
    border-top: 1px solid #DCDDE0;
    background: var(--background);

    font-size: 1.25rem;
    color: #2AA9E0;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: filter 0.2s;

    svg {
      margin-left: 1rem;
    }

    &:hover {
      filter: brightness(0.95);
    }
  }
`;

export const Wrapper = styled.div`
  padding: 2rem 3rem;
  text-align: center;

  > header {
    font-size: 8.75rem;
    font-weight: 600;
    color: var(--blue);
    background-size: contain;
  }

  > strong {
    font-size: 2.25rem;
    color: var(--title);
  }

  > p {
    font-size: 1.25rem;
    color: #999999;
    margin-top: 0.25rem;
  }
`;
