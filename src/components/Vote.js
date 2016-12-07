import React, { Component } from 'react';

export default class Voting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pair: this.props.pair || [],
      disabled: !!this.props.hasVoted,
    };
  }

  hasVotedFor(entry) {
    return this.props.hasVoted === entry;
  }

  render() {
    return (
      <div className="voting">
      {this.state.pair.map(entry =>
        <button
          key={entry}
          disabled={this.state.disabled}
          onClick={() => this.props.vote(entry)}
        >
          <h1 className="title">{entry}</h1>
          {this.hasVotedFor(entry) ?
            <div className="label">Voted</div> :
            null}
        </button>
      )}
      </div>
    )
  }
}
