import React from 'react';

import Header from './components/Header';
import Container from './components/Container';
import AddForm from './components/AddForm';
import BookContainer from './components/Book/BookContainer';

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <AddForm />
        <BookContainer />
      </Container>
    </>
  );
};

export default App;