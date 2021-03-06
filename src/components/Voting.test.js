import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import { expect } from 'chai';
import {List} from 'immutable';

import {Voting} from './Voting';

describe('Voting', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Voting />, div);
  });

   it('renders a pair of voting buttons', () => {
     const component = renderIntoDocument(
        <Voting pair={["Trainspotting", "28 Days Later"]} />
      );
     const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('Trainspotting');
    expect(buttons[1].textContent).to.equal('28 Days Later');
   });

   it('invokes callback when a button is clicked', () => {
     let votedWith;
     // Saves the voted entry in votedWith
     const vote = (entry) => votedWith = entry;
     const component = renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]}
              vote={vote}/>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);

    expect(votedWith).to.equal('Trainspotting');
   });

   it('disables buttons when user has voted', () => {
    const component = renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]}
              hasVoted="Trainspotting" />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    buttons.forEach(function(button) {
      expect(button.hasAttribute('disabled')).to.equal(true);
    });
  });

  it('renders just the winner when there is one', () => {
    const component = renderIntoDocument(
      <Voting winner="Trainspotting" />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(0);

    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Trainspotting');
  });

  it('renders as a pure component', () => {
    const pair = ['Trainspotting', '28 Days Later'];
    // Manually construct a parent <div> and render into it
    // to simulate re-rendering
    const container = document.createElement('div');
    let component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Trainspotting');

    // Mutate the array passed in as props
    pair[0] = 'Sunshine';
    // Re-rendering shouldn't happen since the same array object is passed as props
    // Only a shallow compare is done in case of PureComponent
    // i.e. is it the same array object? rather than
    // do the arrays have the same elements (deep compare)
    component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    );
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Trainspotting');
  });

  it('does update DOM when prop changes', () => {
    const pair = List.of('Trainspotting', '28 Days Later');
    const container = document.createElement('div');
    let component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Trainspotting');

    // Does not work if the state is manipulated inside the component
    const newPair = pair.set(0, 'Sunshine');
    // Re-rendering should happen since the props are passed in a completely new
    // object that differs from the first props passed
    component = ReactDOM.render(
      <Voting pair={newPair} />,
      container
    );
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Sunshine');
  });

});
