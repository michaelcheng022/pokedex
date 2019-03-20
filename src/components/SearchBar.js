import React, { Component } from 'react'

export class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonSuggestions: [],
      pokemonResults: [],

      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    }
  }
  getData = (url) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((pokemon) => {
        this.setState({
          pokemonSuggestions: [...this.state.pokemonSuggestions, ...pokemon.results],
        });
      });
    }
  componentDidMount() {
    this.getData('https://pokeapi.co/api/v2/pokemon?limit=811');
  }
  onChange = (e) => {
    const [ ...suggestions ] = this.state.pokemonSuggestions;
    const userInput = e.target.value;
    // console.log(userInput);
    const filteredSuggestions = suggestions.filter(suggestion => 
      suggestion.name.includes(userInput.toLowerCase()));
    // console.log(filteredSuggestions);
    
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.target.value
    });
  }
  onClick = (e) => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: this.state.filteredSuggestions.filter(suggestion => e.target.innerText === suggestion.name),
      showSuggestions: false,
      userInput: e.target.innerText
    });
  }

  render() {
    return (
      <div className="search-container">
        <form onSubmit={(e) => {
            e.preventDefault();
            this.setState({
              showSuggestions: false,
              userInput: ''
            })
            return this.props.handleSearchSubmit(this.state.filteredSuggestions.slice(0, 10))
        }}>
          <input 
            className="search-bar" 
            type="text" 
            onChange={this.onChange} 
            value={this.state.userInput}
          />
          <button 
            type="submit"
          >
            Search
          </button>
        </form>
        {this.state.showSuggestions && this.state.userInput ? <ul>
          {this.state.filteredSuggestions.slice(0, 5).map((suggestion, i) => {
            return <li key={i} onClick={this.onClick}>{suggestion.name}</li>
          })}
        </ul> : null}
      </div>
    )
  }
}


export default SearchBar
