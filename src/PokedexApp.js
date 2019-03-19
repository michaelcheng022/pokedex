import React, { Component } from 'react';
import PokemonList from './components/PokemonList';
import './styles/styles.scss';

class PokedexApp extends Component {
  render() {
    return (
      <div>
        <h1>Pokedex App</h1>
        <PokemonList />
      </div>
    );
  }
}

export default PokedexApp;
