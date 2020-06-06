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
  }

  render() {
    const { movieWasRetrieved, movie } = this.state;
    const { closeInfo } = this.props;
    return (
      <div>
        <button onClick={closeInfo}>X</button>
        {movieWasRetrieved && (
          <div className="Details">
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
          </div>
        )}
      </div>
    );
  }
}

export default DetailedMovie;
