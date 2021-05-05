import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Nav } from '../components/Nav';
import { useRegisterMutation } from '../generated/graphql';

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useRegisterMutation();

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await register({
        variables: {
          username,
          email,
          password,
        },
      });

      setUsername('');
      setEmail('');
      setPassword('');

      window.alert('User successfully registered!');
      console.log(res);
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Nav />
      <form onSubmit={onSubmit}>
        <label>
          <p>Username</p>
          <input
            type='text'
            placeholder='Enter your username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <p>Email</p>
          <input
            type='email'
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
