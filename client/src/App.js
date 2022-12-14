import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchDrinks from './pages/SearchDrinks';

import SavedDrinks from './pages/SavedDrinks';
import SearchIngredients from './pages/SearchIngredients';
import Navbar from './components/Navbar';
import ImageCarousel from './components/Home';


import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
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
      <Router>
        <>
        <Navbar /> 
        <Routes>
          <Route path='/' element={<ImageCarousel />} />
          <Route path='/recipes' element={<SearchDrinks />} />
          <Route path='/ingredients' element={<SearchIngredients />} />
          <Route path='/save' element={<SavedDrinks />} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Routes>
        </>
      </Router>
      
    </ApolloProvider>
  );
}

export default App;
