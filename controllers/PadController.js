var Pad = require('../models/Pad');

//we need module exports to use controller elsewhere
module.exports = {

	get: function(params, completion){
		Pad.find(params, function(err, pads){
			if (err){
				completion(err, null);
				return;
			}

			var list = [];
			for (var i=0; i<pads.length; i++){
				var pad = pads[i];
				list.push(pad.summary());
			}
				completion(null, list);
				return;
		});
	},

	getById: function(id, completion){
		Pad.findById(id, function(err, pad){
			if (err){
				var error = {message: 'Pad '+id+' Not Found'};
				completion(error, null);
				return;
			}
		//same as this:
			if (pad == null){
				completion( {
					message: 'Pad '+id+' Not Found'
				}, null);
				return;
			}

			completion(null, pad.summary());
				return;
		});
	},


	post: function(params, completion){
		Pad.create(params, function(err, pad){
			if (err){
				completion(err, null);
				return;
				}
				completion(null, pad.summary());
				return;
			});
	},

	put: function(id, params, completion){
		Pad.findByIdAndUpdate(id, params, {new:true}, function(err, pad){
			if (err){
				completion(err, null);
				return;
			}
			completion(null, pad.summary());
		});
		return;
	}
}
