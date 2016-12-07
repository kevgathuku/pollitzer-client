import React, { PureComponent } from 'react';

export default class Voting extends PureComponent {
  getPair() {
    return this.props.pair || [];
  }

  isDisabled() {
    return !!this.props.hasVoted;
  }

  hasVotedFor(entry) {
    return this.props.hasVoted === entry;
  }

  render() {
    return (
      <div className="voting">
      {this.getPair().map(entry =>
        <button
          key={entry}
          disabled={this.isDisabled()}
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
