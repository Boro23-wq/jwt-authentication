import React from 'react';
import { Nav } from '../components/Nav';
import { useProtectedRouteQuery } from '../generated/graphql';

export const ProtectedRoute: React.FC = () => {
  const { data, loading, error } = useProtectedRouteQuery();

  if (error) {
    console.log(error);
    return (
      <>
        <Nav />
        <div style={{ marginTop: '15px' }}>You are not authenticated.</div>
      </>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data.</div>;
  }

  return (
    <>
      <Nav />
      <div style={{ marginTop: '15px' }}>{data.protectedRoute}</div>
    </>
  );
};
