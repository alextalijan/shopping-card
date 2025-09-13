import { Link } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
  return (
    <>
      <h1 className={styles.h1}>Welcome to the All-Around Shop!</h1>
      <p className={styles['intro-text']}>
        Here you can buy anything from clothing to laptop bags.
      </p>
      <div className={styles['images-container']}>
        <img src="/public/shirt.png" alt="" />
        <img src="/public/laptop-bag.png" alt="" />
      </div>
      <p className={styles['shop-redirect-text']}>
        Click on the{' '}
        <Link className={styles['nav-link']} to="/shop" data-testid="shop-link">
          SHOP
        </Link>{' '}
        to browse our store.{' '}
      </p>
    </>
  );
}

export default Home;
