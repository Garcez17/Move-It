import styled from 'styled-components';

export const Overlay = styled.div`
  background: ${props => props.theme.title === 'light' ? 'rgba(242, 243, 245, 0.8)' : 'rgba(9, 10, 12, 0.8)'};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  backdrop-filter: blur(3px);
`;

export const Container = styled.div`
  background: var(--background-secondary);
  width: 100%;
  max-width: 400px;
  
  border-radius: 5px;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 99;

  > button {
    width: 100%;
    padding: 28px 0;
    border: 0;
    border-top: 1px solid #DCDDE0;
    background: #F5FCFF;

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
    background: url('/icons/levelup.svg') no-repeat center;
    background-size: contain;
  }

  > strong {
    font-size: 2.25rem;
    color: var(--title);
  }

  > p {
    font-size: 1.25rem;
    color: var(--text);
    margin-top: 0.25rem;
  }

  > button {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    background: transparent;
    border: 0;
    font-size: 0px;
  }
`;
