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

const createApolloClient = () => {
  return new ApolloClient({
    uri: "http://103.196.155.17:4000/graphql", // URL backend
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "no-cache", // Hindari cache lama
        errorPolicy: "all",
      },
    },
  });
};

export default createApolloClient;