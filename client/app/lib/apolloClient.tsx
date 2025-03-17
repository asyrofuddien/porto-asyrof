import { ApolloClient, InMemoryCache } from '@apollo/client';

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