import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 2.5rem 0;

  h1 {
    font-size: 2.25rem;
    line-height: 2.9rem;
    color: #2E384D;
  }

  table {
    width: 100%;
    margin-top: 2.5rem;
    border-spacing: 0 0.5rem;

    th {
      color: #666666;
      font-size: 0.875rem;
      font-weight: 700;
      text-align: left;
      line-height: 1.5rem;
      filter: opacity(0.5);
    }

    th:nth-child(2) {
      padding-left: 0.25rem;
    }

    td {
      padding: 1rem 0;
      border: 0;
      font-weight: 500;
      font-size: 1rem;
      background: #fff;

      > span {
        color: #5965E0;
        font-weight: 500;
        margin-right: 0.25rem;
      }
    }

    td:first-child {
      width: 96px;
      text-align: center;
      border-radius: 5px 0 0 5px;
      color: #666666;
      font-size: 1.5rem;
    }

    td:nth-child(2) {
      margin-left: 0.25rem;
      padding-left: 1rem;
      display: flex;
      align-items: center;

      > img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
      }

      div {
        margin-left: 1rem;

        strong {
          color: #2E384D;
          font-weight: 600;
          font-size: 1.25rem;
        }

        span {
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          font-size: 1rem;
          font-weight: 400;
          color: #666666;

          > img {
            margin-right: 0.5rem;
          }
        }
      }
    }

    td:last-child {
      border-radius: 0 5px 5px 0;
    }
  }
`;
