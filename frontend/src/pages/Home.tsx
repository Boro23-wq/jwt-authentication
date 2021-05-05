import React from 'react';

import { Nav } from '../components/Nav';
import { useUsersQuery } from '../generated/graphql';

export const Home: React.FC = () => {
  const { data } = useUsersQuery({ fetchPolicy: 'network-only' });

  if (!data) return <div>Loading Users...</div>;

  return (
    <div>
      <Nav />
      <div style={{ marginTop: '20px' }}>Home Page</div>
      <ul>
        {data.users.map((user) => {
          return (
            <li key={user.id}>
              {user.email} - {user.username}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
