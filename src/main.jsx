import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  ApolloProvider,
  ApolloClient,
  gql,
  InMemoryCache
} from '@apollo/client';





const client = new ApolloClient({
  uri: 'https://khoros-graphql-api.vercel.app/api/graphql',
  cache: new InMemoryCache()
});


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
)