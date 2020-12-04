import React from 'react';
import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import { Prefetch } from '../src';

test('test', () => {
  const prefetch = jest.fn()

  render(<Prefetch prefetch={prefetch} render={callbackRef =>
    <div ref={callbackRef} >test</div>
  } />);

  // screen.debug();

  const div = screen.getByText('test');
  fireEvent.mouseDown(div, createEvent.mouseDown(div));

  expect(prefetch).toHaveBeenCalledTimes(1)
});
