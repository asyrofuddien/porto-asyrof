import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const httpLink = new HttpLink({
  uri: 'http://103.196.155.17:4000/graphql',
  fetchOptions: {
    mode: 'no-cors', // Coba tambahkan ini jika masih terjadi error CORS
  },
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Hanya untuk debugging, jangan di production
  },
});

const createApolloClient = () => {
  return new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]),
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined', // Enables SSR mode on the server
  });
};

export default createApolloClient;