import $ from 'jquery';

export default class Processor {
	constructor(username) {
		this.username = username;
		this.followers = []
		this.discovered = {}
		this.undiscovered = {}
		this.sortedList = []
	}

	initializeInfo(callback) {
		let self = this;
		$.get('https://api.soundcloud.com/users/29864265/followings?client_id=96089e67110795b69a95705f38952d8f', function(response) {
			self.followers = response.collection;
			self.getAllFollowers(response.collection, response.next_href, callback)			
		});
	}

	getAllFollowers(followers, next_href, callback) {
		let self = this;		
		if (next_href == null) {
 			self.getFollowersOfFollowers(callback);	
 			return;		
		} else {
			$.get(next_href, function(response) {
				self.followers = self.followers.concat(response.collection);
				self.getAllFollowers(response.collection, response.next_href, callback)			
			});	
		}
	}

	addToDiscovered() {
		let self = this;
		for (var i = 0; i < self.followers.length; i++) {
			var artist = self.followers[i].username;
			this.discovered[artist] = true;
		}
	}

	getFollowersOfFollowers(callback) {
		let self = this;
		self.addToDiscovered();
		for (var i = 0; i < self.followers.length; i++) {
			(function(i) {
				$.get('https://api.soundcloud.com/users/'+self.followers[i].id+'/followings?client_id=96089e67110795b69a95705f38952d8f', function(response) {
					self.processUndiscovered(response.collection);
					if (i == self.followers.length-1) self.buildSortedList(callback);
				});					
			})(i);
		}
	}

	buildSortedList(callback) {
		for (var artist in this.undiscovered)
			this.sortedList.push([artist, this.undiscovered[artist]]);
		this.sortedList.sort(function(a,b) {
			return b[1] - a[1]
		});
		callback(this.sortedList);
	}

	processUndiscovered(artists) {
		let self = this;
		for (var i = 0; i < artists.length; i++) {
			var username = artists[i].username;
			if (!(username in self.discovered)) {
				!(username in self.undiscovered) ? self.undiscovered[username] = 1 : self.undiscovered[username]++;			
			}
		}
	}
}