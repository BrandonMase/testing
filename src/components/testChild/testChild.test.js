import React from 'react';
import { render, screen } from '@testing-library/react';
import { TestChild } from '.';

test('renders learn react link', () => {
  render(<TestChild/>);
  let linkElement = screen.getAllByTestId("here");
  console.log('here', Array.isArray(linkElement));
    
    // console.log(linkElement);
});
