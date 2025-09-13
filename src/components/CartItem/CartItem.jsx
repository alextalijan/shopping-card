function CartItem({ title, price, amount, onClick }) {
  return (
    <div>
      <span>{title}</span>
      <button onClick={onClick}>x</button>
      <span>${price * amount}</span>
      <span>Amount: {amount}</span>
      <button type="button">+</button>
      <button type="button">-</button>
    </div>
  );
}

export default CartItem;
