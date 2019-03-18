import React from 'react';


class Pokemon extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pokemon: [],
      nextUrl: null
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
        console.log(pokemon.results);
        for( let i = 0; i < pokemon.results.length; i++ ) {
          fetch(pokemon.results[i].url)
            .then((response) => {
              return response.json();
            })
            .then((pokemonWithData) => {
              this.setState({
                pokemon: [...this.state.pokemon, {...pokemonWithData}],
              });
            })
        }
        console.log(this.state.pokemon)
        console.log(this.state.nextUrl);
      });
  }
  componentDidMount() {
    this.getData('https://pokeapi.co/api/v2/pokemon/?limit=10');
  }
  handleKeyChange = (e) => {
    console.log(e.target.value);
    // fetch(`https://pokeapi.co/api/v2/pokemon/${e.target.value}`)
    //   .then((response) => {
    //     console.log(response);
    //     if (response.ok) {
    //       return response.json()
    //     } 
    //   })
    //   .then((pokemon) => {
    //     console.log(pokemon);
    //     // if(pokemon) {
    //     //   this.setState({
    //     //     pokemon: [...this.state.pokemon, ...pokemon.results]
    //     //   });
    //     // }
        
    // });
  }
  handleClick = (url, index) => {
    console.log(url);
    // fetch(url)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((pokemon) => {
    //     let updatedPokemon = {...pokemon, ...this.state.pokemon[index]};
    //     console.log(updatedPokemon);
    //     this.setState({
    //       pokemon: [...this.state.pokemon.slice(0, index), updatedPokemon, ...this.state.pokemon.slice(index+1)]
    //     })
    //   })
  }
  handleNext = (url) => {
    this.getData(url);
  }
  render () {
    console.log(this.state.pokemon);
    return (<div>
      <input type="text" onChange={this.handleKeyChange} />
      <div className="pokemon-list">
        {this.state.pokemon.map((pokemon, i)=>{
          return <li 
            key={i} 
            className="pokemon-cell"
            onClick={() => (this.handleClick(pokemon.url, i))}>{pokemon.name}
              
                <img src={pokemon.sprites.front_default} alt={pokemon.name}/> 
              
          </li>
        })}    
      </div>
      <button onClick={()=>this.handleNext(this.state.nextUrl)}>Next</button>
      
      </div>);
  }
  
}

export default Pokemon;