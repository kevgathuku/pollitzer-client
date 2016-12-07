import React, { PureComponent } from 'react';
import {connect} from 'react-redux';

import Vote from './Vote';
import Winner from './Winner';
import * as actionCreators from '../action_creators';

export class Voting extends PureComponent {
  render() {
    return (
      <div>
        {this.props.winner ?
            <Winner ref="winner" winner={this.props.winner} /> :
            <Vote {...this.props} />}
      </div>
    )
  }
}

// Called each time the Redux store is updated
// Maps some entries in the state to props received by the component
function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    winner: state.get('winner'),
    hasVoted: state.get('hasVoted')
  };
}

// Returns a new 'smart' component connected to the Redux store
// Adding actionCreators sends an object with a vote function
// This will be added to the props supplied to 'Voting'
// Calling the vote function dispatches an action to the store
export const VotingContainer = connect(
  mapStateToProps,
  actionCreators
)(Voting);
