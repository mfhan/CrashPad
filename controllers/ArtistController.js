var Artist = require('../models/Artist');
// var bcrypt = require('bcrypt');

module.exports = {

	get: function(params, completion){
		Artist.find(params, function(err, artists){
			if (err){
				completion(err, null);
				return;
			}

			var list = [];
			for (var i=0; i<artists.length; i++){
				var artist = artists[i];
				list.push(artist.summary());
			}
				completion(null, list);
				return;
		});
	},

	post: function(params, completion){

		Artist.create(params, function(err, artist){
			if (err){
				completion(err, null);
				return;
				}
				completion(null, artist.summary());
				return;
			});
	},

	put: function(id, params, completion){
		Artist.findByIdAndUpdate(id, params, {new:true}, function(err, artist){
			if (err){
				completion(err, null);
				return;
			}
			completion(null, artist.summary());
		});
	}
}
