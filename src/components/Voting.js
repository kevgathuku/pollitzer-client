import React, { PureComponent } from 'react';
import {connect} from 'react-redux';

import Vote from './Vote';
import Winner from './Winner';

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

// Called when the Redux store is updated
// Maps some entries in the state to props received by the component
function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    winner: state.get('winner')
  };
}

// Returns a new 'smart' component connected to the Redux store
export const VotingContainer = connect(mapStateToProps)(Voting);
