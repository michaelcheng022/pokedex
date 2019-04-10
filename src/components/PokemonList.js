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
    {props.pokemon.length % 2 === 0 ? null : <div className="pokemon-container"></div>}
    </div>
  );

export default PokemonList
