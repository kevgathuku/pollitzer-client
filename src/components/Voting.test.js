import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './Voting';

describe('Voting', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Voting />, div);
  });

});
