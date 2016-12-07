import React, { Component } from 'react';

class Voting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pair: this.props.pair || []
    };
  }

  render() {
    return (
      <div className="voting">
      {this.state.pair.map(entry =>
        <button key={entry}>
          <h1>{entry}</h1>
        </button>
      )}
      </div>
    )
  }
}

export default Voting;
