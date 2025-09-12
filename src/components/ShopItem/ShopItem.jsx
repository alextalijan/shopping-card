function ShopItem({ id, title, price, imageSrc, addToCart }) {
  return (
    <div className="card">
      <span>{title}</span>
      <img src={imageSrc} alt="" />
      <span>Price: {price}</span>
      <input type="number" defaultValue={0} min={0} />
      <button type="button">Decrement</button>
      <button type="button">Increment</button>
      <button type="button" onClick={() => addToCart(id)}>
        Add To Cart
      </button>
    </div>
  );
}

export default ShopItem;
