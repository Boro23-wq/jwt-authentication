import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { getAccessToken } from './global/accessToken';
import { App } from './App';

const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const accessToken = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: 'include',
  link: authLink.concat(httpLink),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
