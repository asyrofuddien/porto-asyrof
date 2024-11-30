import { ApolloClient, InMemoryCache } from '@apollo/client';

const createApolloClient = () => {
  return new ApolloClient({
    uri: 'http://localhost:4005/graphql', // Replace with your GraphQL endpoint
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined', // Enables SSR mode on the server
  });
};

export default createApolloClient;
