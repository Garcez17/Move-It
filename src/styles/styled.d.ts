import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      background: {
        primary: string;
        secondary: string;
      };
      title: string;
      blue: {
        dark: string;
      }
      button: {
        red: string;
        green: string;
      }
      border: {
        countdown: string;
        line: string;
      }
    }
  }
}