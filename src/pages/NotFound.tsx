import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className='bg-blue-500 mt-4 text-white px-4 py-2 rounded-md'>Go to Homepage</Link>
    </div>
  );
};

export default NotFound;