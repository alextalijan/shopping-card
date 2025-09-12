import styles from './ShopItem.module.css';

function ShopItem({ id, title, price, imageSrc, addToCart }) {
  return (
    <div className={styles.card}>
      <span className={styles.title}>{title}</span>
      <img src={imageSrc} alt="" className={styles.image} />
      <span className={styles.price}>
        <span className={styles['price-label']}>Price:</span> ${price}
      </span>
      <div className={styles['amount-section']}>
        <input
          className={styles['amount-input']}
          type="number"
          defaultValue={0}
          min={0}
        />
        <button type="button" className={styles['increment-btn']}>
          +
        </button>
        <button type="button" className={styles['decrement-btn']}>
          -
        </button>
      </div>
      <button
        className={styles['add-to-cart-btn']}
        type="button"
        onClick={() => addToCart(id)}
      >
        Add To Cart
      </button>
    </div>
  );
}

export default ShopItem;
