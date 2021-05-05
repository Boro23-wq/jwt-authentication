import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { ProtectedRoute } from './pages/ProtectedRoute';
import { Register } from './pages/Register';

export const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <Route path='/protected' exact component={ProtectedRoute} />
      </Switch>
    </Router>
  );
};
