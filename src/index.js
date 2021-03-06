import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, browserHistory} from 'react-router';
import {applyMiddleware, createStore} from 'redux';
import createLogger from 'redux-logger';
import {Provider} from 'react-redux';
import io from 'socket.io-client';

import App from './components/App';
import {ResultsContainer} from './components/Results';
import {VotingContainer} from './components/Voting';
import reducer from './reducer';
import {setState} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';

import './index.css';

const logger = createLogger({
  stateTransformer: (state) => state.toJS()
});

const socket = io(`${location.protocol}//${location.hostname}:8090`);

const store = createStore(
  reducer,
  applyMiddleware(remoteActionMiddleware(socket), logger)
);


socket.on('state', state =>
  store.dispatch(setState(state))
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path="/" component={VotingContainer} />
        <Route path="/results" component={ResultsContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
