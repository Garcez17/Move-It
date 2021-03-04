import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  font-family: Rajdhani;
  font-weight: 600;
  color: var(--title);

  > div {
    flex: 1;

    display: flex;
    align-items: center;
    justify-content: space-evenly;

    background: var(--white);
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    font-size: 8.5rem;
    text-align: center;

    span {
      flex: 1;
    }

    span:first-child {
      border-right: 1px solid #f0f1f3;
    }

    span:last-child {
      border-left: 1px solid #f0f1f3;
    }
  }

  > span {
    font-size: 6.25rem;
    margin: 0 0.5rem;
  }
`;

interface ButtonProps {
  active?: boolean;
}

export const Button = styled.button<ButtonProps>`
  width: 100%;
  height: 5rem;

  margin-top: 2rem;
  outline: none;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  border-radius: ${props => props.active ? '5px 5px 0 0' : '5px'};

  background: ${props => props.active ? 'var(--white)' : 'var(--blue)'};
  color: ${props => props.active ? 'var(--title)' : 'var(--white)'};

  font-size: 1.25rem;
  font-weight: 600;

  transition: 0.2s;

  :not(:disabled):hover {
    background: ${props => props.active ? 'var(--red)' : 'var(--blue-dark)'};
    color: ${props => props.active ? 'var(--white)' : ''};

    svg {
      color: var(--white) !important;
    }
  }

  svg {
    margin-left: 8px;
  }

  :disabled {
    background: var(--white);
    color: var(--title);
    cursor: not-allowed;
  }
`;

interface ProgressBarProps {
  active?: boolean;
}

export const ProgressBar = styled.div<ProgressBarProps>`
  width: 100%;
  height: 4px;
  background: ${props => props.active ? 'var(--gray-line)' : 'transparent'};
  border-radius: 0 0 4px 4px;
`;

const progress = keyframes`
  0% {
    width: 0%;
  }

  100% {
    width: 100%;
  }
`;

interface BarProps {
  time: number;
}

export const Bar = styled.div<BarProps>`
  height: 100%;
  width: 100%;
  background: var(--green);
  border-radius: 0 0 4px 4px;

  animation: ${progress} ${props => props.time}s linear;
`;
