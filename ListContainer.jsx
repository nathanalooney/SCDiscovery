import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ArtistList from './ArtistList.jsx';
import Processor from './processor'

class ListContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {artists: [['a', 1], ['b', 2], ['c', 3]]}
	}

	componentDidMount() {
		var self = this;
		var proc = new Processor('Alex Looney');
		proc.initializeInfo(function(data) {
			self.updateArtists(data);
		});
	}


	updateArtists(artists) {
		this.setState({artists: artists});
	}

	render() {
		return (
				<div>
					<h1>Artists</h1>
					<ArtistList data={this.state.artists}> </ArtistList>
				</div>
			)
	}
}

ReactDOM.render(<ListContainer/>, document.getElementById('hello'));