import styles from './CartItem.module.css';

function CartItem({
  id,
  title,
  imageSrc,
  price,
  amount,
  onClick,
  handleAmountChange,
}) {
  return (
    <div className={styles.card}>
      <span className={styles.title}>{title}</span>
      <button className={styles['remove-btn']} onClick={onClick}>
        x
      </button>
      <img className={styles.image} src={imageSrc} alt="" />
      <span className={styles.price}>Price: ${price * amount}</span>
      <div className={styles['amount-section']}>
        <span className={styles.amount}>Amount: {amount}</span>
        <button
          className={styles['increase-amount-btn']}
          type="button"
          onClick={() => handleAmountChange('increment', id)}
        >
          +
        </button>
        <button
          className={styles['decrease-amount-btn']}
          type="button"
          onClick={() => handleAmountChange('decrement', id)}
        >
          -
        </button>
      </div>
    </div>
  );
}

export default CartItem;
