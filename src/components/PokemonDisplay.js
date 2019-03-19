import React from 'react'

const PokemonDisplay = (props) => (
  <div>
    <div className="image-cell">
      <img src={props.pokemon.sprites.front_default} alt={props.pokemon.name}/>
    </div>
    <div className="details-container">
      <h1>{props.pokemon.name}</h1>
      <p>Height: {props.pokemon.height}</p>
      <p>Weight: {props.pokemon.weight}</p>
      <p>Type: {props.pokemon.types.map((pokemonType) => pokemonType.type.name)}</p>
    </div>
    
  </div>
);

export default PokemonDisplay;