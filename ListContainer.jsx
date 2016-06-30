import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ArtistList from './ArtistList.jsx';
import Processor from './processor'

export default class ListContainer extends React.Component {
	constructor(props) {
		super();
		this.state = {loading: true, percentage: 0}
	}

	componentDidMount() {
		var self = this;
		console.log(self.props)
		var proc = new Processor(self.props.user_id);
		var percentageFinished = setInterval(function() {
			console.log(proc.percentageFinished);
			self.updatePercentage(proc.percentageFinished);
			if (proc.percentageFinished == 100) {
				self.finishedLoading();
				clearInterval(percentageFinished);
			}
		}, 1000);
		proc.initializeInfo(function(data) {
			self.updateArtists(data);
		});
	}

	finishedLoading() {
		this.setState({loading: false});
	}

	updatePercentage(percentage) {
		this.setState({percentage: percentage})
	}
	updateArtists(artists) {
		this.setState({artists: artists});
	}

	render() {
		var information;
		if (this.state.loading) {
			information = <p> Finding Artists: {this.state.percentage}% </p>;
		} else {
			information = <ArtistList data={this.state.artists}> </ArtistList>;
		}
		return (

				<div>
					{information}
				</div>
			)
	}
}

