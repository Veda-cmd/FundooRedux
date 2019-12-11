/**
 * @description:
 * @file:App.js
 * @author:Vedant Nare
 * @version:1.0.0
*/ 

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Register from './components/Register';
import Forgot from './components/Forgot';
import Reset from './components/Reset';
import Dashboard from './components/Dashboard';
import Label from './components/Label';
import Archive from './components/Archive';
import Trash from './components/Trash';
import Login  from './components/Login';
import './App.css';
import Reminder from './components/Reminder';
import Verification from './components/Verification';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router>
        {/* A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. */}
        <Switch>
          <Route path='/' exact={true} component={Login}></Route>
          <Route path='/register' exact={true}component={Register}></Route>
          <Route path='/verify/:url' exact={true}component={Verification}></Route>
          <PrivateRoute path='/dashboard' exact={true} component={Dashboard} />
          <PrivateRoute path="/dashboard/reminders" exact={true} component={Reminder} />
          <PrivateRoute path="/dashboard/archive" exact={true} component={Archive} />
          <PrivateRoute path="/dashboard/trash" exact={true} component={Trash} />
          <PrivateRoute path="/dashboard/label/:name" exact={true} component={Label} />
          <Route path='/forgot' exact={true} component={Forgot}></Route>
          <Route path='/reset/:token' exact={true} component={Reset}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
