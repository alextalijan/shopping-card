import { useEffect, useState } from 'react';
import './App.css';
import { Outlet, Link } from 'react-router-dom';

function App() {
  const [cart, setCart] = useState([]);
  const [shopItems, setShopItems] = useState([]);
  const [loadingShop, setLoadingShop] = useState(true);
  const [shopError, setShopError] = useState(null);

  function addToCart(id, title, imageSrc, price, amount) {
    if (amount === 0) return;

    const addedItem = {
      id,
      title,
      imageSrc,
      price,
      amount,
    };

    for (const item of cart) {
      if (addedItem.id === item.id) {
        const newCart = cart.map((item) => {
          if (item.id === addedItem.id) {
            return {
              id: addedItem.id,
              title: addedItem.title,
              price: addedItem.price,
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

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/')
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            'Failed to load items from the shop. Please try again by refreshing the page.',
          );
        }

        return response.json();
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
  }, []);

  return (
    <>
      <header className="header">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/shop">
          Shop
        </Link>
        <Link className="nav-link" to="/cart">
          Cart <span>({cart.length})</span>
        </Link>
      </header>
      <main>
        <Outlet
          context={{
            shopItems,
            loadingShop,
            shopError,
            addToCart,
            cart,
            setCart,
            removeFromCart,
          }}
        />
      </main>
    </>
  );
}

export default App;
