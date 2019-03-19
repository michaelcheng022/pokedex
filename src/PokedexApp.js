import React, { Component } from 'react';
import Header from './components/Header'
import Pokemon from './components/Pokemon';
import './styles/styles.scss';

class PokedexApp extends Component {
  render() {
    return (
      <div>
        <Header />
        <Pokemon />
      </div>
    );
  }
}

export default PokedexApp;
