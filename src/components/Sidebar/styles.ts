import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 112px;
  background: linear-gradient(180deg, var(--background-secondary) 0%, rgba(255, 255, 255, 0) 100%);
  padding: 32px 0;
  box-shadow: ${props => props.theme.title === 'light' ? '0 0 60px rgba(0, 0, 0, 0.05)' : ''};

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;

    .switch {
      > div {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    > svg {
      width: 8px;
      height: 8px;
    }
  }

  section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;

    svg {
      width: 32px;
      height: 32px;
    }
  }
`;

export const Bar = styled.div`
  height: 100%;
  width: 8px;
  position: absolute;
  background: var(--blue);
  top: 0;
  left: 0;
  border-radius: 0px 5px 5px 0px;
`;

export const Button = styled.button`
  width: 100%;
  height: 56px;

  position: relative;

  background: transparent;
  border: 0;
  
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: filter 0.2s;

  svg {
    width: 32px;
    height: 32px;
  }

  &:hover {
    filter: brightness(0.8);
  }
`;
