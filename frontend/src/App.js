import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Signup from './containers/Signup';

const App = () => (
  <Router>
    <Layout>
      <Switch>

      </Switch>
    </Layout>
  </Router>
)

export default App;