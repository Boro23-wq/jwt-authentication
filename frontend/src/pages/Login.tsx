import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Nav } from '../components/Nav';

import { useLoginMutation } from '../generated/graphql';
import { setAccessToken } from '../global/accessToken';

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useLoginMutation();

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const res = await login({
      variables: {
        email,
        password,
      },
    });

    setEmail('');
    setPassword('');

    console.log(res);

    if (res && res.data) {
      setAccessToken(res.data.login.accessToken);
    }

    history.push('/');
  };
  return (
    <>
      <Nav />
      <form onSubmit={onSubmit}>
        <label>
          <p>Username</p>
          <input
            type='text'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div style={{ marginTop: '10px' }}>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </>
  );
};
