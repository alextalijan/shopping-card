import { vi, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import App from '../App';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ShopItem from '../components/ShopItem/ShopItem';

it('renders', () => {
  render(
    <ShopItem
      id={1}
      title={'Test'}
      price={20}
      imageSrc={''}
      addToCart={() => ''}
      setAnnouncer={() => ''}
    />,
  );
  expect(screen.getByText('Test')).toBeInTheDocument();
  expect(screen.getByText('$20')).toBeInTheDocument();
});

it('calls addToCart when the button is clicked', async () => {
  const user = userEvent.setup();
  const addToCartMock = vi.fn();

  render(
    <ShopItem
      id={1}
      title="Test"
      price={20}
      imageSrc=""
      addToCart={addToCartMock}
      setAnnouncer={() => ''}
    />,
  );

  // increase the amount
  await user.click(screen.getByRole('button', { name: '+' }));

  // now click add to cart
  await user.click(screen.getByRole('button', { name: /add to cart/i }));

  expect(addToCartMock).toHaveBeenCalledTimes(1);
});

it('refuses to have number of items added to cart less than 0', async () => {
  const user = userEvent.setup();

  render(
    <ShopItem
      id={1}
      title="Test"
      price={20}
      imageSrc=""
      addToCart={() => ''}
      setAnnouncer={() => ''}
    />,
  );

  // decrease the amount
  await user.click(screen.getByRole('button', { name: '-' }));

  expect(screen.getByTestId('amount-input')).toHaveValue(0);
});

it('lowers the amount to add to cart with decrement', async () => {
  const user = userEvent.setup();

  render(
    <ShopItem
      id={1}
      title="Test"
      price={20}
      imageSrc=""
      addToCart={() => ''}
      setAnnouncer={() => ''}
    />,
  );

  const input = screen.getByTestId('amount-input');

  // increase the amount
  await user.click(screen.getByRole('button', { name: '+' }));
  expect(input).toHaveValue(1);

  // increase the amount
  await user.click(screen.getByRole('button', { name: '-' }));
  expect(input).toHaveValue(0);
});
