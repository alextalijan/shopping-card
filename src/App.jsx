import { useState } from 'react';
import './App.css';
import { Outlet, Link } from 'react-router-dom';

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    setCart([...cart, item]);
  }

  function removeFromCart(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">
          <span>({cart.length})</span> Cart
        </Link>
      </header>
      <Outlet context={{ addToCart, removeFromCart }} />
    </>
  );
}

export default App;
