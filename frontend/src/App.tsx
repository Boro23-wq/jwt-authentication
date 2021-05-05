import React, { useState, useEffect } from 'react';
import { Routes } from './Routes';

import axios from 'axios';

import { setAccessToken } from './global/accessToken';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .post('http://localhost:5000/refresh_token', {
        withCredentials: true,
      })
      .then(function (res) {
        console.log(res.data);
      });

    // fetch('http://localhost:5000/refresh_token', {
    //   method: 'POST',
    //   credentials: 'include',
    // }).then(async (res) => {
    //   const { accessToken } = await res.json();
    //   console.log(accessToken);
    //   setAccessToken(accessToken);
    //   setLoading(false);
    // });
  }, []);

  // if (loading) {
  //   return <div>loading...</div>;
  // }

  return loading ? <div>Loading...</div> : <Routes />;
};
