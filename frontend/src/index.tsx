import { ColorModeScript } from '@chakra-ui/react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import { App } from './App';

const client = new ApolloClient<NormalizedCacheObject>({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:5000/graphql',
    // headers: {
    //   authorization: localStorage.getItem('token'),
    // },
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <ColorModeScript />
      <App />
    </React.StrictMode>
  </ApolloProvider>,

  document.getElementById('root')
);
