import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --background-secondary: ${props => props.theme.colors.background.secondary};
    --background: ${props => props.theme.colors.background.primary};
    --border-count: ${props => props.theme.colors.border.countdown};
    --gray-line: ${props => props.theme.colors.border.line};
    --text: #666666;
    --text-button: #f2f3f5;
    --button-green: ${props => props.theme.colors.button.green};
    --button-red: ${props => props.theme.colors.button.red};
    --github: #24292E;
    --text-highlight: #b3b9ff;
    --title: ${props => props.theme.colors.title};
    --red: #e83f5b;
    --gray: #ACACAC;
    --green: #4cd62b;
    --blue: #5965e0;
    --text-blue: #B2B9FF;
    --blue-dark: ${props => props.theme.colors.blue.dark};
    --blue-twitter: #2aa9e0;
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }

  body {
    background: var(--background);
    color: var(--text);
  }

  body, input, textarea, button {
    font: 400 1rem "Inter", sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .react-modal-overlay {
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
  }
`;