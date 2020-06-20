import React, { Component } from 'react';

import Axios from 'axios';

import TvShowsListItem from './tvShowsList/tvShowsList';
import DetailedTvShow from '../detailedTvShowPage/detailedTvShow';

import './tvShows.scss';

class TvShows extends Component {
	constructor() {
		super();
		this.state = {
			showToSearch: '',
			showListIMDB: [],
			showListJW: [],
			listWasUpdated: false,
			selectedShowInfo: null,
			detailedProvidersList: null,
			showSeriesInfo: false
		};
	}

	handleTitleChange = (event) => {
		this.setState({
			showToSearch: event.target.value
		});
	};

	queryCurrentTitle = (event) => {
		const { showToSearch } = this.state;

		event.preventDefault();
		Axios.get(`http://localhost:3000/shows/${showToSearch}`)
			.then((results) =>
				this.setState({
					showListIMDB: results.data.imdb.Search,
					showListJW: results.data.justWatch,
					listWasUpdated: true
				})
			)
			.catch((error) => console.log(error));

		Axios.get('http://localhost:3000/providers')
			.then((response) => {
				this.setState({
					detailedProvidersList: response.data
				});
			})
			.catch((error) => console.log(error));
	};

	showMoreInfo = (event) => {
		this.setState({ selectedShowInfo: event, showSeriesInfo: true });
	};

	clearSelectedMovie = (event) => {
		this.setState({ selectedShowInfo: null, showSeriesInfo: false });
	};

	render() {
		const { showListIMDB, listWasUpdated, showSeriesInfo, selectedShowInfo, detailedProvidersList } = this.state;

		return (
			<div className="Series">
				<p className="page-title">
					And the name of the <span className="special-word">series</span> is:
				</p>
				<form className="search-form" onSubmit={(e) => this.queryCurrentTitle(e)}>
					<input className="form-input" onChange={this.handleTitleChange} />
					<button type="submit" className="search-btn">
						<ion-icon name="search-outline" />
					</button>
				</form>
				<div className="series-list">
					{listWasUpdated &&
						showListIMDB.map((show) => (
							<TvShowsListItem
								className="query-list"
								key={show.imdbID}
								{...show}
								moreInfo={() => this.showMoreInfo({ ...show })}
							/>
						))}
				</div>
				<div>
					{showSeriesInfo && (
						<div className="more-info">
							<DetailedTvShow
								{...selectedShowInfo}
								{...{ detailedProvidersList }}
								closeInfo={this.clearSelectedMovie}
							/>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default TvShows;
