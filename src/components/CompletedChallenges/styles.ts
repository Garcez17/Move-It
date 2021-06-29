import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: 1.5rem 0;
  
  font-weight: 500;
`;

export const Info = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;

  border-bottom: 1px solid var(--gray-line);

  span:first-child {
    font-size: 1.25rem;
  }

  span:last-child {
    font-size: 1.5rem;
  }

  & + div {
    margin-top: 1rem;
  }
`;

export const Pomodoro = styled.div`
  display: flex;
  flex-direction: column;

  header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span:first-child {
      font-size: 1.25rem;
    }

    span:last-child {
      font-size: 1.5rem;
    }
  }

  div {
    margin-top: 0.5rem;
    display: flex;
  }
`;

export const Workbar = styled.div`
  flex: 1;
  height: 40px;
  background: var(--red);

  display: flex;
  align-items: center;
  justify-content: center;

  p {
    color: var(--github);
  }

  svg {
    color: var(--github);
  }
`;

export const Breakbar = styled.div`
  width: 32px;
  height: 40px;
  background: var(--green);
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    color: var(--github);
    font-size: 0.7rem;
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }

  svg {
    color: var(--github);
  }
`;


