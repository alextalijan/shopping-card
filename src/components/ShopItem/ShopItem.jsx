import styles from './ShopItem.module.css';
import { useState } from 'react';

function ShopItem({ id, title, price, imageSrc, addToCart, setAnnouncer }) {
  const [amount, setAmount] = useState(0);

  return (
    <div className={styles.card} data-testid="shop-item">
      <span className={styles.title}>{title}</span>
      <img src={imageSrc} alt="" className={styles.image} />
      <span className={styles.price}>
        <span className={styles['price-label']}>Price:</span> ${price}
      </span>
      <div className={styles['amount-section']}>
        <input
          className={styles['amount-input']}
          type="number"
          value={amount}
          onChange={(event) => {
            const input = parseInt(event.target.value);

            if (!input.isNan) {
              setAmount(input);
            }
          }}
          min={0}
          data-testid="amount-input"
        />
        <button
          type="button"
          className={styles['increment-btn']}
          onClick={() => setAmount((prev) => prev + 1)}
        >
          +
        </button>
        <button
          type="button"
          className={styles['decrement-btn']}
          onClick={() => {
            if (amount !== 0) {
              setAmount((prev) => prev - 1);
            }
          }}
        >
          -
        </button>
      </div>
      <button
        className={styles['add-to-cart-btn']}
        type="button"
        onClick={() => {
          if (amount > 0) {
            addToCart(id, title, imageSrc, price, amount);
            setAnnouncer({
              title: 'Success',
              text: "You've added this item to your cart.",
              type: 'good',
            });
          }
        }}
      >
        Add To Cart
      </button>
    </div>
  );
}

export default ShopItem;
