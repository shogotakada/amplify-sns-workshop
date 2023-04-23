import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";
import "@aws-amplify/ui-react/styles.css";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import AllPosts from "./containers/AllPosts";
import PostsBySpecifiedUser from "./containers/PostsBySpecifiedUser";
import { createTheme, ThemeProvider } from "@mui/material";

Amplify.configure(awsconfig);

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#1EA1F2",
      contrastText: "#fff",
    },
    background: {
      default: "#15202B",
      paper: "#15202B",
    },
    divider: "#37444C",
  },
  overrides: {
    MuiButton: {
      color: "white",
    },
  },
  typography: {
    fontFamily: ["Arial"].join(","),
  },
  status: {
    danger: "orange",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Authenticator>
        {({ signOut, user }) => (
          <HashRouter>
            <Switch>
              <Route exact path="/" component={AllPosts} />
              <Route exact path="/global-timeline" component={AllPosts} />
              <Route exact path="/:userId" component={PostsBySpecifiedUser} />
              <Redirect path="*" to="/" />
            </Switch>
          </HashRouter>
        )}
      </Authenticator>
    </ThemeProvider>
  );
};

export default App;
