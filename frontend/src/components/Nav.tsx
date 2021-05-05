import React from 'react';
import { Link } from 'react-router-dom';

export const Nav: React.FC = () => {
  return (
    <>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <div>
        <Link to='/login'>Login</Link>
      </div>
      <div>
        <Link to='/register'>Register</Link>
      </div>
      <div>
        <Link to='/protected'>Protected</Link>
      </div>
    </>
  );
};
