import { useOutletContext } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';

function Cart() {
  const { cart, removeFromCart } = useOutletContext();

  return (
    <>
      <h1>Your Cart</h1>
      <div>
        {cart.length > 0 ? (
          cart.map((item) => {
            return (
              <CartItem
                key={item.id}
                title={item.title}
                price={item.price}
                amount={item.amount}
                onClick={() => removeFromCart(item.id)}
              />
            );
          })
        ) : (
          <p>You have no items in the cart.</p>
        )}
      </div>
    </>
  );
}

export default Cart;
