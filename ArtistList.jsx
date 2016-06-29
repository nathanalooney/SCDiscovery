import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

export default class ArtistList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		var artistNodes = this.props.data.map(function(artist) {
			return (
					<p>{artist[0]+' : '+artist[1]}</p>

				)
		});
		return (
				<div> {artistNodes} </div>
			)
	}
}