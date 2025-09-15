import { vi, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import CartItem from '../components/CartItem/CartItem';

it('renders', () => {
  render(
    <CartItem
      id={0}
      title={'Test Item'}
      imageSrc={'/test.png'}
      price={10}
      amount={1}
      onClick={() => ''}
      handleAmountChange={() => ''}
    />,
  );

  expect(screen.getByText(/test item/i)).toBeInTheDocument();
  expect(screen.getByText(/price: \$10/i)).toBeInTheDocument();
  expect(screen.getByText(/amount: 1/i)).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /increase amount/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /decrease amount/i }),
  ).toBeInTheDocument();
});

it('increases and decreases the amount on click', async () => {
  const user = userEvent.setup();
  const mockHandleAmount = vi.fn();

  render(
    <CartItem
      id={0}
      title={'Test Item'}
      imageSrc={'/test.png'}
      price={10}
      amount={1}
      onClick={() => ''}
      handleAmountChange={mockHandleAmount}
    />,
  );

  const incrementBtn = screen.getByRole('button', { name: /increase amount/i });
  await user.click(incrementBtn);
  expect(mockHandleAmount).toBeCalledTimes(1);

  const decrementBtn = screen.getByRole('button', { name: /decrease amount/i });
  await user.click(decrementBtn);
  expect(mockHandleAmount).toBeCalledTimes(2);
});

it('calls removeFromCart when x button is clicked', async () => {
  const user = userEvent.setup();

  // mock remove function
  const removeMock = vi.fn();

  // render CartItem directly
  render(
    <CartItem
      id={1}
      title="Test Item"
      imageSrc="/test.png"
      price={10}
      amount={2}
      onClick={removeMock}
      handleAmountChange={() => {}}
    />,
  );

  // find the remove button
  const removeBtn = screen.getByRole('button', { name: /remove from cart/i });
  await user.click(removeBtn);

  // assert the mock was called
  expect(removeMock).toHaveBeenCalledTimes(1);
});
