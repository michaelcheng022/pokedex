import React, { Component } from 'react';
import Pokemon from './components/Pokemon';

class PokedexApp extends Component {
  render() {
    return (
      <div>
        Pokedex App
        <Pokemon />
      </div>
    );
  }
}

export default PokedexApp;
