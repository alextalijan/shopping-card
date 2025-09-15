import { vi, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import Announcer from '../components/Announcer/Announcer';

it('renders', () => {
  render(
    <Announcer title={'Test Title'} text={'Test content.'} type={'good'} />,
  );

  expect(screen.getByText('Test Title')).toBeInTheDocument();
  expect(screen.getByText('Test content.')).toBeInTheDocument();
});

it('runs the function to disappear after animation ends', () => {
  vi.useFakeTimers(); // enable fake timers

  const mock = vi.fn();
  render(
    <Announcer
      title={'Test Title'}
      text={'Test content.'}
      type={'good'}
      onFinish={mock}
    />,
  );
  expect(mock).not.toHaveBeenCalled();

  setTimeout(() => {
    expect(mock).toHaveBeenCalledTimes(1);
  }, 5000);
});
