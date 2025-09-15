import { it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Outlet, Link } from 'react-router-dom';
import App from '../App';
import Cart from '../components/Cart/Cart';
import userEvent from '@testing-library/user-event';
import Shop from '../components/Shop/Shop';
import { useState } from 'react';

it('renders', () => {
  render(
    <MemoryRouter initialEntries={['/cart']}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
  expect(
    screen.getByRole('heading', { name: /your cart/i }),
  ).toBeInTheDocument();
});

it('shows an empty cart on initial visit', () => {
  render(
    <MemoryRouter initialEntries={['/cart']}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
  expect(screen.getByText(/you have no items in the cart\./i));
});

it('adds an item to the cart from Shop and shows it in Cart', async () => {
  const user = userEvent.setup();

  // mock shopItems for the test
  const mockShopItems = [
    { id: 1, title: 'Test Item', price: 10, imageSrc: '/test.png' },
  ];

  // simple wrapper to provide context for Shop and Cart
  function Wrapper() {
    const [cart, setCart] = useState([]);
    function addToCart(id, title, imageSrc, price, amount) {
      setCart([{ id, title, imageSrc, price, amount }]);
    }
    function removeFromCart(id) {
      setCart([]);
    }
    return (
      <Outlet
        context={{
          cart,
          setCart,
          shopItems: mockShopItems,
          loadingShop: false,
          shopError: null,
          addToCart,
          removeFromCart,
        }}
      />
    );
  }

  render(
    <MemoryRouter initialEntries={['/shop']}>
      <Routes>
        <Route element={<Wrapper />}>
          <Route path="/" element={<App />}>
            <Route path="shop" element={<Shop />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Route>
      </Routes>
    </MemoryRouter>,
  );

  // nav link should now show (0)
  const cartLink = await screen.findByRole('link', { name: /cart/i });
  expect(cartLink).toHaveTextContent(/\(0\)/);

  // increment amount and add to cart
  const [incrementBtn] = await screen.findAllByRole('button', {
    name: /increase amount/i,
  });
  await user.click(incrementBtn);

  // captures only the first button
  const [addToCartBtn] = await screen.findAllByRole('button', {
    name: /add to cart/i,
  });

  await user.click(addToCartBtn);

  // nav link should now show (1)
  expect(cartLink).toHaveTextContent(/\(1\)/);

  // navigate to cart
  await user.click(cartLink);

  // cart item should be rendered
  expect(await screen.findByTestId('cart-item')).toBeInTheDocument();
});

// this test doesn't pass even though in reality it works
// the problem is in writing the test and not the working code
it('calculates the total price of the cart properly', async () => {
  const user = userEvent.setup();

  // mock shopItems for the test
  const mockShopItems = [
    { id: 1, title: 'Test Item', price: 10, imageSrc: '/test.png' },
    { id: 2, title: 'Test Item 2', price: 20, imageSrc: '/test2.png' },
  ];

  function Wrapper() {
    const [cart, setCart] = useState([]);
    function addToCart(id, title, imageSrc, price, amount) {
      setCart([...cart, { id, title, imageSrc, price, amount }]);
    }
    function removeFromCart(id) {
      setCart(cart.filter((item) => item.id !== id));
    }
    return (
      <>
        {/* fake header with Link for navigation */}
        <nav>
          <Link to="/cart">Cart ({cart.length})</Link>
        </nav>

        <Outlet
          context={{
            cart,
            setCart,
            shopItems: mockShopItems,
            loadingShop: false,
            shopError: null,
            addToCart,
            removeFromCart,
          }}
        />
      </>
    );
  }

  // render only Shop and Cart routes with Wrapper
  render(
    <MemoryRouter initialEntries={['/shop']}>
      <Routes>
        <Route element={<Wrapper />}>
          <Route path="shop" element={<Shop />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );

  // increment amounts and add to cart
  const incrementBtns = await screen.findAllByRole('button', {
    name: /increment amount/i,
  });

  // Increment the first item once, second item twice
  await user.click(incrementBtns[0]);
  await user.click(incrementBtns[1]);
  await user.click(incrementBtns[1]);

  const addToCartBtns = await screen.findAllByRole('button', {
    name: /add to cart/i,
  });

  await user.click(addToCartBtns[0]);
  await user.click(addToCartBtns[1]);

  const cartLink = await screen.findByRole('link', { name: /cart/i });
  await user.click(cartLink);

  expect(screen.getByText(/total:/i)).toHaveTextContent(/total: \$50/i);
});
