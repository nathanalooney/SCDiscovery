import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ArtistList from './ArtistList.jsx';
import ListContainer from './ListContainer.jsx';

class WelcomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state={loading: true, percentage: 0, id: null, start: false}
	}

	componentDidMount() {
		var self = this;
	}

	beginSearch() {
		var self = this;
		var username = $('#username').val();
        var url = 'https://api.soundcloud.com/resolve?url=https://soundcloud.com/' + username.trim() + '&client_id=96089e67110795b69a95705f38952d8f';
		$.get(url, function(response) {
			console.log(response.id);
			self.setState({user_id: response.id, start: true});
		});
	}

	render() {
		return (
			<div>
				<h1 id="headline"> Artist Finder </h1>
				{this.state.start ? null : <p id="subheader"> Input Your Username </p>}
				{this.state.start ? null : <input type="text" id="username"/>}
				<br/>
				{this.state.start ? null : <button type="button" onClick={this.beginSearch.bind(this)}> Find Artists </button>}
				{this.state.start ? <ListContainer user_id={this.state.user_id}/> : null}
			</div>

			)
	}
}

ReactDOM.render(<WelcomePage/>, document.getElementById('hello'));