import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, browserHistory} from 'react-router';

import App from './components/App';
import Results from './components/Results';
import Voting from './components/Voting';

import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={Voting} />
      <Route path="/results" component={Results} />
    </Route>
  </Router>,
  document.getElementById('root')
);
