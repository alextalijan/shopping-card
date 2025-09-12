import { useState } from 'react';
import './App.css';
import { Outlet, Link } from 'react-router-dom';

function App() {
  const [cart, setCart] = useState([]);
  const [shopItems, setShopItems] = useState([]);
  const [loadingShop, setLoadingShop] = useState(true);
  const [shopError, setShopError] = useState(null);

  function addToCart(item, amount) {
    const addedItem = {
      id: item.id,
      amount,
    };

    for (const item of cart) {
      if (addedItem.id === item.id) {
        const newCart = cart.map((item) => {
          if (item.id === addedItem.id) {
            return {
              id: addedItem.id,
              amount: item.amount + addedItem.amount,
            };
          }

          return item;
        });

        setCart(newCart);
        return;
      }
    }

    setCart([...cart, addedItem]);
  }

  function removeFromCart(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  fetch('https://fakestoreapi.com/products/')
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          'Failed to load items from the shop. Please try again by refreshing the page.',
        );
      }
    })
    .then((data) => {
      const items = [];

      for (let i = 0; i < 10; i += 1) {
        items.push({
          id: data[i].id,
          title: data[i].title,
          price: data[i].price,
          imageSrc: data[i].image,
        });
      }

      setShopItems(items);
    })
    .catch((error) => {
      setShopError(error.message);
    })
    .finally(() => {
      setLoadingShop(false);
    });

  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">
          <span>({cart.length})</span> Cart
        </Link>
      </header>
      <Outlet
        context={{
          addToCart,
          removeFromCart,
          shopItems,
          loadingShop,
          shopError,
        }}
      />
    </>
  );
}

export default App;
