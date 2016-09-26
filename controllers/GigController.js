var Gig = require('../models/Gig');

//we need module exports to use controller elsewhere
module.exports = {

	get: function(params, completion){
		Gig.find(params, function(err, gigs){
			if (err){
				completion(err, null);
				return;
			}

			var list = [];
			for (var i=0; i<gigs.length; i++){
				var gig = gigs[i];
				list.push(gig);
			}
				completion(null, list);
				return;
		});
	},



	post: function(params, completion){
		Gig.create(params, function(err, gig){
			if (err){
				completion(err, null);
				return;
				}
				completion(null, gig);
				return;
			});
	}

}
