import React, { Component } from 'react';
import Axios from 'axios';

import API_URL from '../../configs/api';

class TvShowsListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imdbInfo: null,
			allProviders: null,
			filteredProvidersList: [],
			isFiltered: false
		};
	}

	componentDidMount() {
		const { imdbID } = this.props;

		Axios.get(`${API_URL}/single-show/${imdbID}`)
			.then((results) =>
				this.setState({
					imdbInfo: results.data.imdb,
					allProviders: results.data.justWatch[0].offers
				})
			)
			.catch((error) => console.log(error));
	}

	componentDidUpdate(prevState) {
		const { allProviders, filteredProvidersList } = this.state;

		if (allProviders !== prevState.allProviders) {
			allProviders.forEach((offer) => {
				if (!filteredProvidersList.includes(offer.provider_id)) {
					filteredProvidersList.push(offer.provider_id);
					this.setState({ isFiltered: true });
				}
			});
		}
	}

	render() {
		const { Poster, Title, Year, moreInfo } = this.props;
		const { isFiltered, filteredProvidersList } = this.state;
		return (
			<div className="Item">
				<img src={Poster} className="poster" alt="Tv Show Poster" />
				<div className="title-identification">
					<span className="title-name">{Title}</span>
					<span className="title-year">{Year}</span>
					<div className="providers">
						{isFiltered &&
							filteredProvidersList.map((id) => (
								<img
									src={require(`../../images/providerIcons/${id}.jpeg`)}
									className="provider-logo"
									key={id}
									alt="Provider Icon."
								/>
							))}
					</div>
				</div>
				<button className="more-button" onClick={moreInfo}>
					<ion-icon name="information-circle-outline" />
				</button>
			</div>
		);
	}
}

export default TvShowsListItem;
