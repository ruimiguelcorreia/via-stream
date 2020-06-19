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
			typeSelected: null,
			userFilteredList: null
		};
	}

	componentDidMount() {
		const { imdbID } = this.props;

		Axios.get(`http://localhost:3000/single-movie/${imdbID}`)
			.then((response) => {
				this.setState({
					movie: response.data,
					movieWasRetrieved: true,
					providers: response.data.justWatch[0].offers
				});
			})
			.catch((error) => console.log(error));
	}

	componentDidUpdate(prevState) {
		const { providers, buy, rent, stream } = this.state;

		if (providers !== prevState.providers) {
			providers.forEach((offer) => {
				if (offer.monetization_type === 'buy') {
					buy.push(offer);
				} else if (offer.monetization_type === 'rent') {
					rent.push(offer);
				} else {
					stream.push(offer);
				}
			});
		}
	}

	selectProviderType = (event) => {
		this.setState({
			typeSelected: event.target.value
		});
	};

	render() {
		const { movieWasRetrieved, movie, typeSelected, buy, stream, rent } = this.state;
		const { closeInfo } = this.props;
		let displayedProviders;

		if (typeSelected === 'buy') {
			displayedProviders = true;
		} else if (typeSelected === 'rent') {
			displayedProviders = rent;
		} else if (typeSelected === 'stream') {
			displayedProviders = stream;
		} else {
			displayedProviders = 'Select an option above.';
		}

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
							<img src={movie.imdb.Poster} />
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
								<button className="provider-buy" value="buy" onClick={this.selectProviderType}>
									Buy
								</button>
								<button className="provider-rent" value="rent" onClick={this.selectProviderType}>
									Rent
								</button>
								<button className="provider-stream" value="stream" onClick={this.selectProviderType}>
									Stream
								</button>
							</div>
							<div class="providers-list">
								<label for="service">Choose a provider:</label>
								<select id="service">
									{typeSelected === 'buy' &&
										buy.forEach((choice) => <option>choice.provider_id</option>)}
								</select>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default DetailedMovie;
