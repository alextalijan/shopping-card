import { useOutletContext } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';
import styles from './Cart.module.css';

function Cart() {
  const { cart, setCart, removeFromCart } = useOutletContext();

  function handleAmountChange(type, id) {
    const item = cart.find((item) => item.id === id);
    let newCart;

    if (type === 'increment') {
      newCart = [
        ...cart.filter((cartItem) => cartItem.id !== id),
        { ...item, amount: item.amount + 1 },
      ];
    } else {
      if (item.amount > 1) {
        newCart = [
          ...cart.filter((cartItem) => cartItem.id !== id),
          { ...item, amount: item.amount - 1 },
        ];
      } else {
        return;
      }
    }

    setCart(newCart);
  }

  return (
    <>
      <h1 className={styles.h1}>Your Cart</h1>
      <div className={styles['cart-list']}>
        {cart.length > 0 ? (
          cart.map((item) => {
            return (
              <CartItem
                key={item.id}
                id={item.id}
                title={item.title}
                imageSrc={item.imageSrc}
                price={item.price}
                amount={item.amount}
                onClick={() => removeFromCart(item.id)}
                handleAmountChange={handleAmountChange}
              />
            );
          })
        ) : (
          <p className={styles['empty-cart-text']}>
            You have no items in the cart.
          </p>
        )}
        {cart.length > 0 && (
          <div className={styles.checkout}>
            <span className={styles['total-price']}>
              TOTAL: $
              {cart
                .reduce((current, item) => {
                  return item.price * item.amount + current;
                }, 0)
                .toFixed(1)}
            </span>
            <button type="button" className={styles['buy-btn']}>
              Buy
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
