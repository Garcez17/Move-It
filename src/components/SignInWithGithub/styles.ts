import styled from 'styled-components';

export const Container = styled.button`
  border-radius: 8px;
  width: 100%;
  height: 80px;
  background: var(--github);
  color: var(--background);
  font-size: 24px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  transition: 0.2s;

  gap: 16px;

  &:hover {
    filter: brightness(0.8);
  }

  :disabled {
    background: var(--blue-dark);
    cursor: not-allowed;
  }
`;
