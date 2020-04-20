import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom'; 

import NavBar from './navBar/navBar';
import Homepage from './main/homepage';
import Movies from './movies/movies';
import TvShows from './tvShows/tvShows';
import Subscriptions from './subscriptionSelector/subscriptions';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component ={Homepage} />
          <Route exact path="/movies" component ={Movies} />
          <Route exact path="/tv-shows" component = {TvShows} />
          <Route exact path="/subscriptions" component = {Subscriptions} />
        </Switch>
      </div>
    )
  }
}

export default App;