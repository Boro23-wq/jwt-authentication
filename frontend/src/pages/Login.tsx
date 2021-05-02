import React, { useState } from 'react';

import { useLoginMutation } from '../generated/graphql';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useLoginMutation();

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await login({
        variables: {
          email,
          password,
        },
      });

      setEmail('');
      setPassword('');

      window.alert('User successfully logged in!');
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
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
  );
};
