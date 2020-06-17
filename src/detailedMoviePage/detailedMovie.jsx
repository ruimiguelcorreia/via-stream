import React, { Component } from 'react';
import Axios from 'axios';

import './detailedMovie.scss';

class DetailedMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      movieWasRetrieved: false,
      providers: [],
      rent: [],
      buy: [],
      stream: [],
    };
  }

  componentDidMount() {
    const { imdbID } = this.props;

    Axios.get(`http://localhost:3000/single-movie/${imdbID}`)
      .then((response) => {
        this.setState({
          movie: response.data,
          movieWasRetrieved: true,
          providers: response.data.justWatch[0].offers,
        });
      })
      .catch((error) => console.log(error));

    Axios.get(`http://localhost:3000/single-movie/${imdbID}`)
      .then((response) => {
        response.data.justWatch[0].offers.map((offer) => {
          if ((offer.monetization_type = 'buy')) {
            this.state.buy.push(offer);
          } else if ((offer.monetization_type = 'rent')) {
            this.state.rent.push(offer);
          } else {
            this.state.stream.push(offer);
          }
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { movieWasRetrieved, movie, providers } = this.state;
    const { closeInfo } = this.props;
    return (
      <div>
        {movieWasRetrieved && (
          <div className="Details">
            <button onClick={closeInfo} className="close-btn">
              X
            </button>
            <div className="title">{movie.imdb.Title}</div>
            <div className="awards">{movie.imdb.Awards}</div>
            <span className="poster">
              <img src={movie.imdb.Poster} />
            </span>
            <span className="rated">{movie.imdb.Rated}</span>
            <span className="plot">{movie.imdb.Plot}</span>
            <span className="table-title">Released:</span>
            <span className="table-content">{movie.imdb.Released}</span>
            <span className="table-title">Writers:</span>
            <span className="table-content">{movie.imdb.Writer}</span>
            <span className="table-title">Actors:</span>
            <span className="table-content">{movie.imdb.Actors}</span>
            <span className="table-title">Genre:</span>
            <span className="table-content">{movie.imdb.Genre}</span>
            <span className="table-title">Box Office:</span>
            <span className="table-content">{movie.imdb.BoxOffice}</span>
            <span className="table-title">Runtime:</span>
            <span className="table-content">{movie.imdb.Runtime}</span>

            <div className="providers-table">
              <span className="type-selector"></span>
              <span class="providers-list"></span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DetailedMovie;
