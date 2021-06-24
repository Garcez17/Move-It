import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 5px 0px 0px 5px;
  
  padding: 16px 32px;
  width: 340px;
  height: 80px;
  background: linear-gradient(90deg, #4953B8 0%, rgba(73, 83, 184, 0.2) 100%);
  display: flex;
  align-items: center;
  border: 2px solid transparent;

  transition: border 0.2s;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    border: 0;
    background: transparent;
    font-size: 1.6rem;
    font-weight: 600;
    outline: none;
    font-size: 20px;
    font-weight: 500;
    color: var(--white);

    ::placeholder {
      font-size: 20px;
      font-weight: 400;
      color: var(--text-blue);
    }
  }

  :hover {
    border: 2px solid #414AA3;
  }
`;
