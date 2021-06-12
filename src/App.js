import './App.scss'
import Signup from './components/Signup'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from './components/ForgotPassword'
import UpdateProfile from './components/UpdateProfile'
import Tweets from './components/Tweets'
import Following from './components/Following'
import logo from "./images/logo.png"
import React, { useState, useEffect } from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <img src={logo}/>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/update-profile" component={UpdateProfile} />
              <PrivateRoute exact path="/tweets" component={Tweets} />
              <PrivateRoute exact path="/following" component={Following} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path ="/forgot-password" component={ForgotPassword}/>
            </Switch>
          </AuthProvider>
        </Router>
      </header>
    </div>
  );
}

export default App;
