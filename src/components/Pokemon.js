import React, { Component } from 'react';
import SearchBar from './SearchBar'
import PokemonList from './PokemonList';
import PokemonDisplay from './PokemonDisplay'

class Pokemon extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pokemon: [],
      nextUrl: null,
      currPokemon: 0,
      searchActive: false
    }
  }
  reset = () => {
    window.location.reload();
  }
  getData = (url) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((pokemon) => {
        this.setState({
          //pokemon: [...this.state.pokemon, ...pokemon.results],
          nextUrl: pokemon.next
        });
        //console.log(pokemon.results.length);
        for(let i = 0; i < pokemon.results.length; i++ ) {
          //console.log(pokemon.results[i].url);
          fetch(pokemon.results[i].url)
            .then((response) => {
              return response.json();
            })
            .then((pokemonWithData) => {
              //console.log(pokemonWithData);
              this.setState({
                pokemon: [...this.state.pokemon, {...pokemonWithData}],
              });
            })
        }
      });
  }
  componentDidMount() {
    this.getData('https://pokeapi.co/api/v2/pokemon/?limit=10');
  }
  handleSearchSubmit = (searchResults) => {
    this.setState({
      searchActive: true,
      nextUrl: null,
      pokemon: []
    })
    console.log(searchResults);
    for(let i = 0; i < searchResults.length; i++ ) {
      console.log(searchResults[0].url);
      fetch(searchResults[i].url)
        .then((response) => {
          return response.json();
        })
        .then((pokemonWithData) => {
          console.log(pokemonWithData);
          this.setState({
            pokemon: [...this.state.pokemon, {...pokemonWithData}],
          });
        })
    }
  }
  handleClick = (index) => {
    this.setState({
      currPokemon: index
    })
  }
  handleNext = (url) => {
    this.getData(url);
  }
  render () {
    // console.log(this.state.pokemon);
    return (<div>
      <SearchBar handleSearchSubmit={this.handleSearchSubmit} />
      <div className="pokedex-container">
        <PokemonList handleClick={this.handleClick} pokemon={this.state.pokemon} />    
        <div className="pokemon-display">
          {this.state.pokemon.length > 0 ? 
            <PokemonDisplay 
              pokemon={this.state.pokemon[this.state.currPokemon]}
            /> : null}
        </div>
      </div>
      <button onClick={()=> (this.state.nextUrl ? this.handleNext(this.state.nextUrl) : null)}>Next</button>
      <button onClick={this.reset}>Reset</button>        
    </div>);
  }
  
}

export default Pokemon;