import React from "react"
import { HashRouter as Router, Switch, Route } from "react-router-dom"
import { Container, ChakraProvider } from "@chakra-ui/react"
import styled, { ThemeProvider } from "styled-components"

import Header from "./components/Header"
import chakraTheme from "./utils/chakraTheme"

import Game from "./pages/Game"
import { Web3Provider } from "./contexts/Web3"
import { UbirollProvider } from "./contexts/Ubiroll"

function App() {
  return (
    <Router>
      <SiteWrapper>
        <Header />
        <BodyWrapper maxW="container.xl" display="flex" alignItems="start" justifyContent="center">
          <Switch>
            <Route path="/">
              <Game />
            </Route>
          </Switch>
        </BodyWrapper>
      </SiteWrapper>
    </Router>
  );
}

const SiteWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  z-index: 1;
  // background-color: #fff;
  // background-image:
  //   radial-gradient(at top left, rgb(242,237,220), transparent),
  //   radial-gradient(at top right, rgb(242,227,200), transparent),
  //   radial-gradient(at bottom left, rgb(242,227,200), transparent);
`;

const BodyWrapper = styled(Container)`
  height: ${props => `calc(100vh - ${props.theme.headerHeight})`}
`;

const Providers: React.FC = ({ children }) => {
  const styledTheme = {
    headerHeight: '60px',
  };

  return (
    <ThemeProvider theme={styledTheme}>
      <ChakraProvider theme={chakraTheme}>
        <Web3Provider>
          <UbirollProvider>
            {children}
          </UbirollProvider>
        </Web3Provider>
      </ChakraProvider>
    </ThemeProvider>
  );
};

function withProviders<P>(
  Component: React.ComponentType<P>
) {
  const ComponentProviders = (props: P) => {
    return (
      <Providers>
        <Component {...props}/>
      </Providers>
    )
  };
  return ComponentProviders;
}

export default withProviders(App);