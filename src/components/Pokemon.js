import React from 'react';
import PokemonDisplay from './PokemonDisplay'

class Pokemon extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pokemon: [],
      nextUrl: null,
      currPokemon: 0
    }
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
        console.log(pokemon.results.length);
        for(let i = 0; i < pokemon.results.length; i++ ) {
          console.log(pokemon.results[i].url);
          fetch(pokemon.results[i].url)
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
      });
  }
  componentDidMount() {
    this.getData('https://pokeapi.co/api/v2/pokemon/?limit=10');
  }
  handleKeyChange = (e) => {
    console.log(e.target.value);
    fetch(`https://pokeapi.co/api/v2/pokemon/${e.target.value}`)
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json()
        } 
      })
      .then((pokemon) => {
        console.log(pokemon);
        if (pokemon) {
          this.setState({
            pokemon: [...this.state.pokemon, {...pokemon}],
          });
        }
        
        
    });
  }
  handleClick = (index) => {
    console.log(index);
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
      <div className="search-container">
        <input className="search-bar" type="text" onChange={this.handleKeyChange} />
      </div>
      <div className="pokedex-container">
        <div className="pokemon-list">
          {this.state.pokemon.map((pokemon, i)=>{
            return <li 
              key={i} 
              className="pokemon-cell"
              onClick={() => (this.handleClick(i))}
              >
                <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
                <p>{pokemon.name}</p>
            </li>
          })}    
        </div>
        <div className="pokemon-display">
          {this.state.pokemon.length > 0 ? 
            <PokemonDisplay 
              pokemon={this.state.pokemon[this.state.currPokemon]}
            /> : <p>DISPLAY GOES HERE</p>}
        </div>
      </div>
      <button onClick={()=> (this.state.nextUrl ? this.handleNext(this.state.nextUrl) : null)}>Next</button>
    </div>);
  }
  
}

export default Pokemon;