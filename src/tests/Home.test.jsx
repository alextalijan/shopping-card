import { it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import App from '../App';

it('renders', () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} /> {/* Home page */}
        </Route>
      </Routes>
    </MemoryRouter>,
  );
  expect(container).toMatchSnapshot();
});

it('switches to shop page after clicking on the link', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} /> {/* Home page */}
          <Route path="shop" element={<h1>Shop</h1>} /> {/* Shop page */}
        </Route>
      </Routes>
    </MemoryRouter>,
  );
  await user.click(screen.getByTestId('shop-link'));
  expect(screen.getByRole('heading', { name: /shop/i })).toBeInTheDocument();
});
