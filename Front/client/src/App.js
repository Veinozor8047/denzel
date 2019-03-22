import React, { Component } from 'react';
import './App.css';
import MoviePage from './Page';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <h1>Denzos</h1>
          <MoviePage/>
        </div>
      </div>
    );
  }
}

export default App;
