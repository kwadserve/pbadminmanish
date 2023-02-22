import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Corporate from '../Templates/Corporate';
import { HomePage, NotFound } from '../pageListAsync';
import Application from './Application';

function Landing() {
  return (
    <Corporate>
      <Switch>
        <Route exact path="/" component={Application} />
        <Route component={NotFound} />
      </Switch>
    </Corporate>
  );
}

export default Landing;
