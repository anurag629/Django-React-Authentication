import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import Home from './containers/Home';
import Login from './containers/Login';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Signup from './containers/Signup';

import { Provider } from 'react-redux';
import store from './store';

import Layout from './hocs/Layout';

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Routes>
          {/* <Route exact path='/' element={<Home />} /> */}
          <Route exact path='/' element={<Login />} />
          <Route exact path='/activate/:uid/:token' element={<Activate />} />
          <Route exact path='/reset-password' element={<ResetPassword />} />
          <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm />} />
          <Route exact path='/signup' element={<Signup />} />
        </Routes>
      </Layout>
    </Router>
  </Provider>

);

export default App;