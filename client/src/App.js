import React, { Component } from 'react';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
const client = new ApolloClient({
  uri:'http://localhost:5000/graphql'
})
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div className="App">
        <h1>Book List</h1>
        <BookList/>
        <AddBook/>
        
      </div>
      </ApolloProvider>
    );
  }
}

export default App;
