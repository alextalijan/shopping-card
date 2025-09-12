import { useOutletContext } from 'react-router-dom';
import ShopItem from '../ShopItem/ShopItem';

function Shop() {
  const { shopItems, loadingShop, shopError, addToCart } = useOutletContext();

  return (
    <>
      <h1>Shop</h1>
      {loadingShop && <p>Loading...</p>}
      {shopError && <p>shopError</p>}
      <div>
        {shopItems.map((item) => {
          return (
            <ShopItem
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              imageSrc={item.imageSrc}
              addToCart={addToCart}
            />
          );
        })}
      </div>
    </>
  );
}

export default Shop;
