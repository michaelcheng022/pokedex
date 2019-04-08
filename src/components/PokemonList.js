import React from 'react'

const PokemonList = (props) => (
    <div className="pokemon-list">
    {props.pokemon.map((pokemon, i)=>{
      return <div key={i} className="pokemon-container">
        <li 
          key={i} 
          className="pokemon-cell"
          onClick={() => (props.handleClick(i))}
          >
            <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
            <p>{pokemon.name}</p>
        </li>
      </div>
    })}
    </div>
  );

export default PokemonList
