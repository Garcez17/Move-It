import styled from 'styled-components';

export const Container = styled.button`
  border-radius: 0px 5px 5px 0px;
  width: 80px;
  height: 80px;
  background: var(--green);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  transition: 0.2s;

  > svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    filter: brightness(0.9);
  }

  :disabled {
    background: var(--blue-dark);
    cursor: not-allowed;
  }
`;
