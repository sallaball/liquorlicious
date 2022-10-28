import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  // ApolloProvider,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <header className="App-header">
        <h1>Liquorlicious</h1>
        <p>
          An app where you can search beverage recipes.
        </p>
        
      </header>
    </ApolloProvider>
  );
}

export default App;
