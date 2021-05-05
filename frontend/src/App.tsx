import React, { useState, useEffect } from 'react';
import { Routes } from './Routes';
import { setAccessToken } from './global/accessToken';

export const App: React.FC = () => {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch('http://localhost:5000/refresh_token', {
  //     method: 'POST',
  //     credentials: 'include',
  //   }).then(async (x) => {
  //     const data = await x.json();
  //     console.log(data);
  //     setAccessToken(data.accessToken);
  //     setLoading(false);
  //   });
  // }, []);

  // if (loading) {
  //   return <div>loading...</div>;
  // }

  return <Routes />;
};
