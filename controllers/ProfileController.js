var Profile = require('../models/Profile');
var bcrypt = require('bcrypt');

//we need module exports to use controller elsewhere
module.exports = {

	get: function(params, completion){
		Profile.find(params, function(err, profiles){
			if (err){
				completion(err, null);
				return;
			}

			var list = [];
			for (var i=0; i<profiles.length; i++){
				var profile = profiles[i];
				list.push(profile.summary());
			}
				completion(null, list);
				return;
		});
	},

	getRawProfiles: function(params, completion){
		Profile.find(params, function(err, profiles){
			if (err){
				completion(err, null);
				return;
			}
			completion(null, profiles);
		});
	},


	getById: function(id, completion){
		Profile.findById(id, function(err, profile){
			if (err){
				var error = {message: 'Profile '+id+' Not Found'};
				completion(error, null);
				return;
			}
		//same as this:
			if (profile == null){
				completion( {
					message: 'Profile '+id+' Not Found'
				}, null);
				return;
			}

			completion(null, profile.summary());
				return;
		});
	},


	post: function(params, completion){ //this is where we CREATE a profile
		var plainTextPassword = params['password'];
		var hashedPassword = bcrypt.hashSync(plainTextPassword,10);//fh$4w6yqu7y8e
		params['password'] = hashedPassword;//this is now the jumbled password

		Profile.create(params, function(err, profile){
			if (err){
				completion(err, null);
				return;
				}
				completion(null, profile.summary());
				return;
			});
	},

	put: function(id, params, completion){
		Profile.findByIdAndUpdate(id, params, {new:true}, function(err, profile){
			if (err){
				completion(err, null);
				return;
			}
			completion(null, profile.summary());
		});
	}
}
