import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, browserHistory} from 'react-router';

import App from './components/App';
import Voting from './components/Voting';

import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={Voting} />
    </Route>
  </Router>,
  document.getElementById('root')
);
