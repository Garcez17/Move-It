import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 112px;
  background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);
  padding: 32px 0;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);

  position: absolute;
  top: 0;
  left: 0;

  section {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > div {
      width: 100%;

      > a {
        cursor: pointer;
        position: relative;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          width: 32px;
          height: 32px;
        }
      }

      a + a {
        margin-top: 16px;
      }
    }
  }
`;

export const Bar = styled.div`
  height: 100%;
  width: 4px;
  background: var(--blue);
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 0px 5px 5px 0px;
`;
