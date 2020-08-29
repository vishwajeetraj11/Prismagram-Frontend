import React from "react";
import GlobalStyles from "../Styles/GlobalStyles";
import styled, { ThemeProvider } from "styled-components";
import Theme from "../Styles/Theme";
import AppRouter from "./Router";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import createBrowserHistory from 'history/createBrowserHistory';
// const history = createBrowserHistory();

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

function App() {
  const { data } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
    <>
      <GlobalStyles />
      <Wrapper>
        <AppRouter isLoggedIn={data.isLoggedIn} />
        <Footer />
        </Wrapper>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  );
}

export default App;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
`;
