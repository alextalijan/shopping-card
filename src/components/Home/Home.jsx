import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <h1>Welcome to the All-Around Shop!</h1>
      <p>Here you can buy anything from clothing to laptop bags.</p>
      <div>
        <img src="/public/shirt.png" alt="" />
        <img src="/public/laptop-bag.png" alt="" />
      </div>
      <p>
        Click on the <Link to="/shop">shop</Link> to browse our store.{' '}
      </p>
    </>
  );
}

export default Home;
