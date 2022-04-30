import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React from 'react';
import { LoginForm, RegisterForm } from '@login';
import { Home } from '@airline/home';
import { ExplorePage } from '@cs487-app/explore-page';
import { AccountPage } from '@cs487-app/account-page';
import { MessagesPage } from '@cs487-app/message-page';

const AppRouter = () => {
  return (
    <Switch>
      <Route exact render={() => <AccountPage />} path="/account" />
      <Route exact render={() => <MessagesPage />} path="/messages" />

      <Route exact render={() => <ExplorePage />} path="/explore" />
      <Route exact render={() => <Home />} path="/home" />
      <Route exact render={() => <RegisterForm />} path="/register" />
      <Route exact render={() => <LoginForm />} path="/" />
    </Switch>
  );
};

export default AppRouter;
