import {createGlobalStyle} from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html, body, div, p {
    font-family: 'Noto Sans KR', sans-serif;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #f8f9fa;
  }
`;

export default GlobalStyles;
