import React from 'react';
import {Route, Redirect } from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';

export default function ReversedPrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={
        ({ location }) => {
          return auth.user ? (
            <Redirect
              to={{
                pathname: location.state ? location.state.from.pathname : '/',
                state: { from: location }
              }}
            />
          ) : (
            children 
          )
        }
      }
    />
  );
}
