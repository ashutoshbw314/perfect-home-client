import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { useAuth, ProvideAuth } from '../hooks/useAuth';
import PrivateRoute from '../routes/PrivateRoute';
import ReversedPrivateRoute from '../routes/ReversedPrivateRoute';
import HomePage from './HomePage/HomePage';
import AdminPage from './AdminPage/AdminPage';
import OrdersPage from './OrdersPage/OrdersPage';
import SignInPage from './SignInPage/SignInPage';
import SignUpPage from './SignUpPage/SignUpPage';
import ServicesPage from './ServicesPage/ServicesPage';

function App() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/services' component={ServicesPage} />
          <ReversedPrivateRoute exact path='/login'>
            <SignInPage /> 
          </ReversedPrivateRoute>
          <Route exact path='/signup' component={SignUpPage} />
          <PrivateRoute exact path='/admin'>
            <AdminPage />
          </PrivateRoute>
          <PrivateRoute exact path='/orders'>
            <OrdersPage />
          </PrivateRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  )
}

export default App;
