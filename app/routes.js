import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Stats from './components/Stats'


export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/stats' component={Stats} />
  </Route>
);