import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import ApplicationBar from "./Components/ApplicationBar";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeRoute from "./Routes/Home";
import CreateBilling from "./Routes/CreateBilling";
import Login from "./Routes/Login";
import { SnackbarProvider } from "notistack";
import NetworkChangeHandler from "./Components/NetworkChangeHandler";

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <SnackbarProvider>
        <Router>
          <ApplicationBar></ApplicationBar>
          <Container maxWidth="sm" mt={10} style={{ marginTop: 30 }}>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/rekam-ssp">
                <CreateBilling />
              </Route>
              <Route path="/">
                <HomeRoute />
              </Route>
            </Switch>
          </Container>
        </Router>
        <NetworkChangeHandler />
      </SnackbarProvider>
    </React.Fragment>
  );
}
