import React, { Component } from 'react';
import Axios from 'axios';

import { FaSistrix } from 'react-icons/fa';

import MoviesListItem from './moviesList/moviesList';
import DetailedMovie from '../detailedMoviePage/detailedMovie';

import './movies.scss';

class Movies extends Component {
  constructor() {
    super();
    this.state = {
      movieToSearch: '',
      movieListIMDB: [],
      movieListJW: [],
      listWasUpdated: false,
      selectedMovieInfo: null,
      showMovieInfo: false,
    };
  }

  handleTitleChange = (event) => {
    this.setState({
      movieToSearch: event.target.value,
    });
  };

  queryCurrentTitle = (event) => {
    const { movieToSearch } = this.state;

    event.preventDefault();
    Axios.get(`http://localhost:3000/movies/${movieToSearch}`)
      .then((results) =>
        this.setState({
          movieListIMDB: results.data.imdb,
          movieListJW: results.data.justWatch,
          listWasUpdated: true,
        }),
      )
      .catch((error) => console.log(error));
  };

  showMoreInfo = (event) => {
    this.setState({ selectedMovieInfo: event, showMovieInfo: true });
  };

  clearSelectedMovie = (event) => {
    this.setState({ selectedMovie: null, showMovieInfo: false });
  };

  render() {
    const {
      movieListIMDB,
      movieListJW,
      listWasUpdated,
      showMovieInfo,
      selectedMovieInfo,
    } = this.state;
    return (
      <div className="Movies">
        <p className="page-title">
          And the name of the <span className="special-word">movie</span> is:
        </p>
        <form className="search-form" onSubmit={(e) => this.queryCurrentTitle(e)}>
          <input className="form-input" onChange={this.handleTitleChange} />
          <button type="submit" className="search-btn">
            <ion-icon name="search-outline" />
          </button>
        </form>
        <div className="movies-list">
          {listWasUpdated &&
            movieListIMDB.map((movie) => (
              <MoviesListItem
                className="query-list"
                key={movie.imdbID}
                {...movie}
                moreInfo={() => this.showMoreInfo({ ...movie })}
              />
            ))}
        </div>
        <div>
          {showMovieInfo && (
            <div className="more-info">
              <DetailedMovie {...selectedMovieInfo} closeInfo={this.clearSelectedMovie} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Movies;
