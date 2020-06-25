import React, { Component } from 'react';

import data from './options.json';

import './subscriptions.scss';

const limit = 10;

class Subscriptions extends Component {
	constructor() {
		super();
		this.state = {
			selection: [],
			hasResult: false,
			bestOption: ''
		};
	}

	handleSelection = (option) => {
		const { selection } = this.state;

		const index = selection.findIndex((title) => title === option);

		if (selection.length >= limit && index == -1) return;

		index >= 0 ? selection.splice(index, 1) : selection.push(option);

		this.setState({ selection });
	};

	calculateResult = (event) => {
		const { selection } = this.state;

		const calculation = selection.reduce((acc, curr) => {
			const found = acc.find((titleAccumulator) => titleAccumulator.provider === curr.provider);

			found ? found.counter++ : acc.push({ provider: curr.provider, counter: 1 });

			return acc;
		}, []);

		calculation.sort((a, b) => a.counter - b.counter);

		const winner = calculation.pop();
		this.setState({ bestOption: winner.provider, hasResult: true });
	};

	render() {
		const { hasResult, bestOption, selection } = this.state;
		return (
			<div className="Helper">
				<p className="introduction">
					Let us help you decide where to <span className="special-word">wisely</span> spend your money!
				</p>
				<p className="instructions">
					Select <span className="special-word">{limit}</span> of the following titles and get your answer:
				</p>

				<div className="options">
					{data.map((option) => (
						<div
							onClick={() => this.handleSelection(option)}
							key={option.name}
							className={selection.find((title) => title === option) ? 'option-selected' : 'option'}
						>
							<img src={option.poster} alt="Poster" className="poster" />
							<p className="option-name">{option.name}</p>
						</div>
					))}
				</div>

				{selection.length == 10 ? (
					<button onClick={this.calculateResult} className="results-btn">
						Get Results
					</button>
				) : (
					''
				)}

				{hasResult && (
					<p className="result">
						Your most suitable subscription is <span className="special-word">{bestOption}</span>.
					</p>
				)}
			</div>
		);
	}
}

export default Subscriptions;
