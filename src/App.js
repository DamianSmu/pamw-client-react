import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Redirect } from 'react-router'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Signup from "./components/signup.component";
import Login from "./components/login.component";
import Dashboard from "./components/dashboard.component";
import Start from "./components/start.component";
import HeaderComponent from "./components/header.component";
import FooterComponent from "./components/footer.component";
import Logout from "./components/logout.component";
import authService from "./services/auth.service";


function PrivateRoute ({component: Component, ...rest}) {
  var authed = authService.isUserLoggedIn()
  return (
    <Route
      {...rest}
      render={(props) => {
        return authed === true
          ? <Component {...props} /> 
          : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
      }}
    />
  )
}
class App extends Component {
  render() {
    var isUserLoggedIn = authService.isUserLoggedIn();
    return (
        <div className="container">
          <Router>
            <HeaderComponent />
              <Switch>
                <Route path = "/" exact component = {Start}/>
                <Route path = "/login" component = {Login}/>
                <PrivateRoute path = "/dashboard" component = {Dashboard}/>
                <Route path = "/signup" component = {Signup}/>
                <Route path = "/logout" component = {Logout}/>
              </Switch>
            <FooterComponent />
          </Router>
        </div>

          );
  }
}


export default App;