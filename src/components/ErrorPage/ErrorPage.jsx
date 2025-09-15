import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.css';

function ErrorPage() {
  return (
    <>
      <h1 className={styles.h1}>Error: Page Not Found</h1>
      <p className={styles['error-message']} data-testid="error-text">
        Make sure you've requested an existing page.
      </p>
      <p className={styles['error-message']} data-testid="error-text">
        Click to go back to the{' '}
        <Link className={styles['nav-link']} to="/">
          home page
        </Link>
        .
      </p>
      <img className={styles['error-img']} src="/public/error.png" alt="" />
    </>
  );
}

export default ErrorPage;
