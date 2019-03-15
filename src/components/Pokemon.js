import React from 'react';

class Pokemon extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pokemon: []
    }
  }
  componentDidMount() {
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then((response) => {
        return response.json();
      })
      .then((pokemon) => {
        // console.log(pokemon);
        this.setState({
          pokemon: [...this.state.pokemon, ...pokemon.results]
        });
    });
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
        if(pokemon) {
          this.setState({
            pokemon: [...this.state.pokemon, ...pokemon.results]
          });
        }
        
    });
  }
  handleClick = (url, index) => {
    console.log(url);
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((pokemon) => {
        let updatedPokemon = {...pokemon, ...this.state.pokemon[index]};
        console.log(updatedPokemon);
        this.setState({
          pokemon: [...this.state.pokemon.slice(0, index), updatedPokemon, ...this.state.pokemon.slice(index+1)]
        })
      })
  }
  render () {
    console.log(this.state.pokemon);
    return (<div>
      Pokemon pic goes here
      <input type="text" onChange={this.handleKeyChange} />
      {this.state.pokemon.map((pokemon, i)=>{
        return <li onClick={() => (this.handleClick(pokemon.url, i))}>{pokemon.name}
        <p>{pokemon.height}</p>
        { (pokemon.sprites && pokemon.sprites.front_default) ?
          <img src={pokemon.sprites.front_default} alt={pokemon.name}/> : null
        }
        </li>
      })}    
      
      </div>);
  }
  
}

export default Pokemon;