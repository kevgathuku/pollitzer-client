import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, browserHistory} from 'react-router';
import {createStore} from 'redux';

import App from './components/App';
import Results from './components/Results';
import Voting from './components/Voting';
import reducer from './reducer';

import './index.css';

const store = createStore(reducer);

store.dispatch({
  type: 'SET_STATE',
  state: {
    vote: {
      pair: ['Sunshine', '28 Days Later'],
      tally: {Sunshine: 2}
    }
  }
});

ReactDOM.render(
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={Voting} />
      <Route path="/results" component={Results} />
    </Route>
  </Router>,
  document.getElementById('root')
);
