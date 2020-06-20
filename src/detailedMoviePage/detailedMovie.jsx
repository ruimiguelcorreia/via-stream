import React, { Component } from 'react';
import Axios from 'axios';

import imdb from '../images/critics/imdb-logo.png';
import rotten from '../images/critics/tomatoes-logo.png';
import metacritic from '../images/critics/metacritic-logo.png';

import './detailedMovie.scss';

class DetailedMovie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movie: null,
			movieWasRetrieved: false,
			rent: [],
			buy: [],
			stream: [],
			typeSelected: null
		};
	}

	componentDidMount() {
		const { imdbID } = this.props;

		Axios.get(`http://localhost:3000/single-movie/${imdbID}`)
			.then((response) => {
				const providers = response.data.justWatch[0].offers;
				const sort = (a, b) => a.provider_id - b.provider_id;
				const buy = providers.filter((offer) => offer.monetization_type === 'buy').sort(sort);
				const rent = providers.filter((offer) => offer.monetization_type === 'rent').sort(sort);
				const stream = providers.filter((offer) => offer.monetization_type === 'flatrate').sort(sort);

				this.setState({
					movie: response.data,
					movieWasRetrieved: true,
					buy,
					rent,
					stream,
					typeSelected: buy.length > 0 ? 'buy' : rent.length > 0 ? 'rent' : 'stream'
				});
			})
			.catch((error) => console.log(error));
	}

	selectProviderType = (event) => {
		this.setState({
			typeSelected: event.target.value
		});
	};

	render() {
		const { movieWasRetrieved, movie, typeSelected, buy, stream, rent } = this.state;
		const { closeInfo } = this.props;
		const providers = typeSelected === 'buy' ? buy : typeSelected === 'rent' ? rent : stream;

		return (
			<div>
				{movieWasRetrieved && (
					<div className="Details">
						<button onClick={closeInfo} className="close-btn">
							<ion-icon name="close-circle-outline" />
						</button>
						<div className="title">{movie.imdb.Title}</div>
						<div className="awards">{movie.imdb.Awards}</div>
						<span className="poster">
							<img src={movie.imdb.Poster} alt="Movie Poster" />
							<div className="scoring">
								<div className="col-1">
									<img src={imdb} alt="Imdb Logo" />
									<span>{movie.imdb.Ratings[0].Value}</span>
								</div>
								<div className="col-2">
									<img src={rotten} alt="Rotten Tomatoes Logo" />
									<span>{movie.imdb.Ratings[1].Value}</span>
								</div>
								<div className="col-3">
									<img src={metacritic} alt="Metacritic Logo" />
									<span>{movie.imdb.Ratings[2].Value}</span>
								</div>
							</div>
						</span>
						<span className="rated">{movie.imdb.Rated}</span>
						<span className="plot">
							<p>{movie.imdb.Plot}</p>
						</span>
						<span className="table-title">
							<p>Released:</p>
						</span>
						<span className="table-content">
							<p>{movie.imdb.Released}</p>
						</span>
						<span className="table-title">
							<p>Writers:</p>
						</span>
						<span className="table-content">
							<p>{movie.imdb.Writer}</p>
						</span>
						<span className="table-title">
							<p>Actors:</p>
						</span>
						<span className="table-content">
							<p>{movie.imdb.Actors}</p>
						</span>
						<span className="table-title">
							<p>Genre:</p>
						</span>
						<span className="table-content">
							<p>{movie.imdb.Genre}</p>
						</span>
						<span className="table-title">
							<p>Box Office:</p>
						</span>
						<span className="table-content">
							<p>{movie.imdb.BoxOffice}</p>
						</span>
						<span className="table-title">
							<p>Runtime:</p>
						</span>
						<span className="table-content">
							<p>{movie.imdb.Runtime}</p>
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
							<div class="providers-list">
								{providers.map((choice) => (
									<div className="individual-offer">
										<p className="individual-quality">{choice.presentation_type}</p>
										<img
											src={require(`../images/providerIcons/${choice.provider_id}.jpeg`)}
											className="individual-img"
											alt="Provider Logo"
										/>
										<p className="individual-price">
											{typeSelected === 'buy' || typeSelected === 'rent' ? (
												`£ ${choice.retail_price}`
											) : (
												''
											)}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default DetailedMovie;
