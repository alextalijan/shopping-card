import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import App from '../App';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

it('renders', () => {
  const { container } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(container).toMatchSnapshot();
});

describe('Navbar', () => {
  it('contains header on load', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('changes the page when a link is clicked', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<h1>Home</h1>} /> {/* Home page */}
            <Route path="shop" element={<h1>Shop</h1>} /> {/* Shop page */}
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    (expect(screen.getByRole('heading', { name: /home/i })).toBeInTheDocument(),
      await user.click(screen.getByRole('link', { name: /shop/i })));
    expect(screen.getByRole('heading', { name: /shop/i }));
  });

  it('has all the working links', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<h1>Home</h1>} /> {/* Home page */}
            <Route path="shop" element={<h1>Shop</h1>} /> {/* Shop page */}
            <Route path="cart" element={<h1>Cart</h1>} /> {/* Shop page */}
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('link', { name: /shop/i }));
    expect(screen.getByRole('heading', { name: /shop/i })).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: /cart/i }));
    expect(screen.getByRole('heading', { name: /cart/i })).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: /home/i }));
    expect(screen.getByRole('heading', { name: /home/i })).toBeInTheDocument();
  });
});
