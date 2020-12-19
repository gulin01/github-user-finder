import './App.css';
import React from 'react';
import {BrowserRouter as Router , Switch , Route } from 'react-router-dom';
import Navbar from './Components/layout/Navbar';
import Home from './Components/pages/Home';
import User from './Components/users/User'
import Alert from './Components/layout/Alert';
import About from './Components/pages/About';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import NotFound from './Components/pages/NotFound';
const App =() =>{

    return (
      <GithubState>
       <AlertState>
      <Router>
      <div className="App">
      <Navbar/>
      <div className="container">
      <Alert/>
      <Switch>
        <Route exact path = '/' component = {Home}/>
        <Route exact path="/about" component = {About}  />
        <Route exact path="/User/:login" component = {User}/>
        <Route component = {NotFound}/>
      </Switch>
      </div>
      </div>
      </Router>
      </AlertState>
      </GithubState>
    );
  }



export default App;
