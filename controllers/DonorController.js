var Donor = require('../models/Donor');

module.exports = {

	get: function(params, completion){
		Donor.find(params, function(err, donors){
			if (err){
				completion(err, null);
				return;
			}

			var list = [];
			for (var i=0; i<donors.length; i++){
				var donor = donors[i];
				list.push(donor.summary());
			}
				completion(null, list);
				return;
		});
	},


	post: function(params, completion){

		Donor.create(params, function(err, donor){
			if (err){
				completion(err, null);
				return;
				}
				completion(null, donor.summary());
				return;
			});
	}

	// put: function(id, params, completion){
	// 	Donor.findByIdAndUpdate(id, params, {new:true}, function(err, donor){
	// 		if (err){
	// 			completion(err, null);
	// 			return;
	// 		}
	// 		completion(null, donor.summary());
	// 	});
	// }
}
