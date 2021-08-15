import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "@components/PrivateRoute";
import LoginPage from "@pages/Auth/LoginPage";
import SignUpPage from "@pages/Auth/SignUpPage";
import ForgotPasswordPage from "@pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "@pages/Auth/ResetPasswordPage";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
      <Route path="/password_reset/:userId" component={ResetPasswordPage} />
      <PrivateRoute path="/">
        <App />
      </PrivateRoute>
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
