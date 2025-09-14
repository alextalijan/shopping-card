import { it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import App from '../App';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Shop from '../components/Shop/Shop';

it('renders', () => {
  render(
    <MemoryRouter initialEntries={['/shop']}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="shop" element={<Shop />} /> {/* Shop page */}
        </Route>
      </Routes>
    </MemoryRouter>,
  );
  expect(screen.getByRole('heading', { name: /shop/i })).toBeInTheDocument();
});

it('shows loading before the items have been loaded', () => {
  render(
    <MemoryRouter initialEntries={['/shop']}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="shop" element={<Shop />} /> {/* Shop page */}
        </Route>
      </Routes>
    </MemoryRouter>,
  );
  expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument();
});

it('loads items from the shop', async () => {
  render(
    <MemoryRouter initialEntries={['/shop']}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="shop" element={<Shop />} /> {/* Shop page */}
        </Route>
      </Routes>
    </MemoryRouter>,
  );
  expect(await screen.findAllByTestId(/shop-item/i)).not.toHaveLength(0);
  expect(screen.queryByText(/loading\.\.\./i)).toBeNull();
});
