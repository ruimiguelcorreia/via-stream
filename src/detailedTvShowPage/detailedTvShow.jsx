import React, { Component } from 'react';
import Axios from 'axios';

import imdb from '../images/critics/imdb-logo.png';
import rotten from '../images/critics/tomatoes-logo.png';
import metacritic from '../images/critics/metacritic-logo.png';

import '../detailedMoviePage/detailedMovie.scss';

class DetailedTvShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: null,
      showWasRetrieved: false,
      rent: [],
      buy: [],
      stream: [],
      typeSelected: null,
    };
  }

  componentDidMount() {
    const { imdbID } = this.props;

    Axios.get(`http://localhost:3000/single-show/${imdbID}`)
      .then((response) => {
        const providers = response.data.justWatch[0].offers || [];
        const sort = (a, b) => a.provider_id - b.provider_id;
        const buy = providers.filter((offer) => offer.monetization_type === 'buy').sort(sort);
        const rent = providers.filter((offer) => offer.monetization_type === 'rent').sort(sort);
        const stream = providers
          .filter((offer) => offer.monetization_type === 'flatrate')
          .sort(sort);

        this.setState({
          show: response.data,
          showWasRetrieved: true,
          buy,
          rent,
          stream,
          typeSelected: buy.length > 0 ? 'buy' : rent.length > 0 ? 'rent' : 'stream',
        });
      })
      .catch((error) => console.log(error));
  }

  selectProviderType = (event) => {
    this.setState({
      typeSelected: event.target.value,
    });
  };

  render() {
    const { showWasRetrieved, show, typeSelected, buy, stream, rent } = this.state;
    const { closeInfo } = this.props;
    const providers = typeSelected === 'buy' ? buy : typeSelected === 'rent' ? rent : stream;

    return (
      <div>
        {showWasRetrieved && (
          <div className="Details">
            <button onClick={closeInfo} className="close-btn">
              <ion-icon name="close-circle-outline" />
            </button>
            <div className="title">{show.imdb.Title}</div>
            <div className="awards">{show.imdb.Awards}</div>
            <span className="poster">
              <img src={show.imdb.Poster} alt="Show Poster" />
              <div className="scoring">
                <div className="col-1">
                  <img src={imdb} alt="Imdb Logo" />
                  <span>{show.imdb.Ratings[0].Value}</span>
                </div>
                <div className="col-2">
                  <img src={rotten} alt="Rotten Tomatoes Logo" />
                  <span>{Math.floor(show.justWatch[0].scoring[0].value)}%</span>
                </div>
                <div className="col-3">
                  <img src={metacritic} alt="Metacritic Logo" />
                  <span>{show.justWatch[0].scoring[1].value}</span>
                </div>
              </div>
            </span>
            <span className="rated">{show.imdb.Rated}</span>
            <span className="plot">
              <p>{show.imdb.Plot}</p>
            </span>
            <span className="table-title released">
              <p>Released:</p>
            </span>
            <span className="table-content released-result">
              <p>{show.imdb.Released}</p>
            </span>
            <span className="table-title writer">
              <p>Writers:</p>
            </span>
            <span className="table-content writer-result">
              <p>{show.imdb.Writer}</p>
            </span>
            <span className="table-title actor">
              <p>Actors:</p>
            </span>
            <span className="table-content actor-result">
              <p>{show.imdb.Actors}</p>
            </span>
            <span className="table-title genre">
              <p>Genre:</p>
            </span>
            <span className="table-content genre-result">
              <p>{show.imdb.Genre}</p>
            </span>
            <span className="table-title boxoffice">
              <p>Seasons:</p>
            </span>
            <span className="table-content boxoffice-result">
              <p>{show.imdb.totalSeasons}</p>
            </span>
            <span className="table-title runtime">
              <p>Runtime:</p>
            </span>
            <span className="table-content runtime-result">
              <p>{show.imdb.Runtime}</p>
            </span>

            <div className="providers-table">
              <div className="type-selector">
                {buy.length > 0 && (
                  <button
                    className={(typeSelected === 'buy' ? 'selected' : '') + ' provider-buy'}
                    value="buy"
                    onClick={this.selectProviderType}
                  >
                    Buy
                  </button>
                )}
                {rent.length > 0 && (
                  <button
                    className={(typeSelected === 'rent' ? 'selected' : '') + ' provider-rent'}
                    value="rent"
                    onClick={this.selectProviderType}
                  >
                    Rent
                  </button>
                )}
                {stream.length > 0 && (
                  <button
                    className={(typeSelected === 'stream' ? 'selected' : '') + ' provider-stream'}
                    value="stream"
                    onClick={this.selectProviderType}
                  >
                    Stream
                  </button>
                )}
              </div>
              {providers.length > 0 ? (
                <div className="providers-list">
                  {providers.map(({ provider_id, presentation_type, retail_price }) => (
                    <div key={provider_id + presentation_type} className="individual-offer">
                      <p className="individual-quality">{presentation_type}</p>
                      <img
                        src={require(`../images/providerIcons/${provider_id}.jpeg`)}
                        className="individual-img"
                        alt="Provider Logo"
                      />
                      <p className="individual-price">
                        {typeSelected === 'buy' || typeSelected === 'rent'
                          ? `£ ${retail_price}`
                          : ''}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-list">No streaming services.</div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DetailedTvShow;
