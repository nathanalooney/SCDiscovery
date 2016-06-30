import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

export default class ArtistList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		var artistNodes = this.props.data.map(function(artist, i) {
			return (
					<tr key={i}><th><p>{artist[0]}</p></th><th><p>{artist[1]}</p></th></tr>
				)
		});
		return (
				<table><tbody>{artistNodes}</tbody></table>
			)
	}
}