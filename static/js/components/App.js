import React, { Component } from 'react';
import request from 'superagent';

import Search from './Search';
import CurrentWeather from './CurrentWeather';
import LocationList from './LocationList';

export default class App extends Component {

  constructor(){
    super();
    this.state = {
      favorites: [],
      newcity: null
    }
    this.searchForWeather = this.searchForWeather.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.removeFromFavourites = this.removeFromFavourites.bind(this);
  }

  toggleFavorite(city) {
    if(this.isCityInFavorites(city)){
      this.removeFromFavourites(city);
    }
    else{
      this.addToFavorites(city);
    }
  }

  addToFavorites(city) {
    let favorites = this.state.favorites;

    favorites.push({
      city: city,
      timestamp: Date.now()
    });

    this.setState({
      favorites: favorites
    });

    localStorage.favorites = JSON.stringify(favorites);
  }

  removeFromFavourites(city) {
    let favorites = this.state.favorites;
    let index = -1;

    for (var i = 0; i < favorites.length; i++) {
      if(favorites[i].city == city){
        index = i;
        break;
      }
    }

    if(index !== -1){
      favorites.splice(index, 1);

      this.setState({
        favorites: favorites
      });

    localStorage.favorites = JSON.stringify(favorites);
    }
  }

  isCityInFavorites(city) {
    let favorites = this.state.favorites;

    for(var i = 0; i < favorites.length; i++){
      if (favorites[i].city == city) {
        return true;
      }
    }

    return false;
  }

  searchForWeather(city) {
    request
      .post()
      .send(city)
      .end(
        (err, result) => {
          if(!err) {
            this.setState({
              newcity: result.body
            })
          }
        });
  }

  handleSubmit(event){
    event.preventDefault();
    this.searchForWeather(this.state.newcity)
  }

  handleChange(event){
    event.preventDefault();
    let searchcity = event.target.value
    this.setState({newcity: searchcity});
    this.searchForWeather(this.state.newcity)
  }

  render() {
    return(
      <div>
        <h3>Know your weather</h3>
        <Search />
        <CurrentWeather />
        <LocationList />
      </div>
    );
  }
}