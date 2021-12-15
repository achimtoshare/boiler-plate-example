import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import LandingPage from "./component/views/LandingPage/LandingPage";
import LoginPage from "./component/views/LoginPage/LoginPage";
import RegisterPage from "./component/views/RegisterPage/RegisterPage";

function App() {
  return (
    <Router>
      <div>
        
 

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/register" component={RegisterPage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

