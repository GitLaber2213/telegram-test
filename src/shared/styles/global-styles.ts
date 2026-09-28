import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }

  html, body, #root { height: 100%; }

  body {
    margin: 0;
    font-family: ${({ theme }) => theme.font.sans};
    color: ${({ theme }) => theme.color.text};
    background: ${({ theme }) => theme.color.bg};
    -webkit-font-smoothing: antialiased;
  }

  button, input { font: inherit; }
  button { cursor: pointer; }
  ul { margin: 0; padding: 0; list-style: none; }
`
