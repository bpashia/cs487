// apps/my-app/src/app/app.tsx
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React from 'react';
import { LoginForm, RegisterForm } from '@login';
import { Home } from '@airline/home';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route render={() => <Home />} path="/home" />
        <Route render={() => <RegisterForm />} path="/register" />
        <Route render={() => <LoginForm />} path="/" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
