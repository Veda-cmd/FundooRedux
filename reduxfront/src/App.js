/**
 * @description:
 * @file:App.js
 * @author:Vedant Nare
 * @version:1.0.0
*/ 

import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Register from './components/Register';
import AllNotes from './components/AllNotes';
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
          <Route path='/' exact={true} component={Login}></Route>
          <Route path='/register' exact={true}component={Register}></Route>
          <Route path='/verify/:url' exact={true}component={Verification}></Route>
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <PrivateRoute path='/dashboard/notes' component={AllNotes} />
          <PrivateRoute path='/dashboard/reminders' component={Reminder} />
          <PrivateRoute path="/dashboard/archive" component={Archive} />
          <PrivateRoute path="/dashboard/trash" component={Trash} />
          <PrivateRoute path="/dashboard/label/:name" component={Label} />
          <Route path='/forgot' component={Forgot}></Route>
          <Route path='/reset/:token' component={Reset}></Route>
      </Router>
    </div>
  );
}

export default App;
