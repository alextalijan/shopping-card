import { useOutletContext } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';
import styles from './Cart.module.css';

function Cart() {
  const { cart, removeFromCart } = useOutletContext();

  return (
    <>
      <h1 className={styles.h1}>Your Cart</h1>
      <div className={styles['cart-list']}>
        {cart.length > 0 ? (
          cart.map((item) => {
            return (
              <CartItem
                key={item.id}
                title={item.title}
                imageSrc={item.imageSrc}
                price={item.price}
                amount={item.amount}
                onClick={() => removeFromCart(item.id)}
              />
            );
          })
        ) : (
          <p className={styles['empty-cart-text']}>
            You have no items in the cart.
          </p>
        )}
      </div>
    </>
  );
}

export default Cart;
