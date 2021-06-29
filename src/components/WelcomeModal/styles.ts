import styled from 'styled-components';

export const Container = styled.div`
  background: var(--background-secondary);
  width: 100%;
  max-width: 420px;
  border-radius: 8px;
`;

export const Wrapper = styled.div`
  padding: 24px;

  h1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--text-button);
  }

  form {
    display: flex;
    flex-direction: column;

    span {
      display: block;
      margin: 32px 0;
      color: #999999;
      font-size: 18px;
      font-weight: 700;
    }

    label {
      display: flex;
      flex-direction: column;
      width: 100%;
      color: #999999;

      select {
        margin-top: 8px;
        background: var(--background);
        padding: 12px;
        border-radius: 4px;
        background: url('http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png') no-repeat right var(--background);
        -webkit-appearance: none;
        background-position-x: 340px;

        font-size: 16px;
        font-weight: 700;
        color: var(--gray-line);
      }
    }

    label + label {
      margin-top: 16px;
    }

    button {
      margin-top: 32px;
      padding: 16px 0;
      border: 0;
      border-radius: 4px;
      background: var(--green);
      font-size: 20px;
      font-weight: 700;
      color: var(--text-button);
      transition: 0.2s;

      &:hover {
        filter: brightness(0.8);
      }
    }
  }
`;