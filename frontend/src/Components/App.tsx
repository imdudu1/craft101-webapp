import React from 'react';
import Routes from "./Routes";
import {Container} from 'react-bootstrap';

import GlobalStyles from "../Styles/GlobalStyles";
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <Container>
      <GlobalStyles/>
      <Routes/>
    </Container>
  );
}

export default App;
