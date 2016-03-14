var express = require('express');
var router = express.Router();
var ProfileController = require('../controllers/ProfileController');
var PadController = require('../controllers/PadController');

var controllers = {
    'profile':ProfileController,
    'pad':PadController
}

function createErrorObject(msg){
	var error = {
		confirmation:'fail',
		message: msg
	}
	return error;
}

router.post('/:resource', function(req, res, next) {
    var resource = req.params.resource;

    if (resource == 'login'){
    	var loginCredentials = req.body;
    	var email = loginCredentials.email;

    //we must find the profile with that email:
	    ProfileController.getRawProfiles({email:email}, function(err, results){
	    	if (err){
		      	res.json(createErrorObject(err.message));
		    	return;
	    	}

	    	if (results.length == 0){
		      	res.json(createErrorObject('User Not Found'));
		    	return;
	    	}

	    	var user = results[0];
	    	if (loginCredentials.password != user.password){
	    		res.json(createErrorObject('Incorrect password'));
		    	return;
	    	}
	    	//now that the login is a success, we're installing a cookie
			req.session.user = user._id;
	    	res.json({
	    		confirmation: 'success',
	    		profile: user.summary()
	    		});
	    	return;
	    });
	    return;
	}


    var controller = controllers[resource];
    if (controller == null){
    	res.json(createErrorObject(resource+ ' is not a valid resource'));
    	return;
    }

	controller.post(req.body, function(err, result){
		if (err){
			res.json(createErrorObject(err.message));
			return;
		}

        if (resource == 'profile'){
            req.session.user =result.id;
        }

		res.json({
			confirmation: 'success',
			result:result
		});
		return;
	});
	return;
});


router.get('/:resource', function(req, res, next) {
    var resource = req.params.resource;

    if (resource == 'currentuser'){
    	if (req.session == null){
    		res.json(createErrorObject('User not logged in'));
    		return;
    	}

    	if (req.session.user == null){
    		res.json(createErrorObject('User not logged in'));
    		return;
    	}

    	// res.json({
    	// 	confirmation:'success',
    	// 	userId: req.session.user
    	// })

		ProfileController.getById(req.session.user, function(err, result){
			if (err){
			res.json(createErrorObject(err.message));
    		return;
			}
			res.json({
				confirmation: 'success',
				currentuser: result
			});
			return;
		});
    	return;
    }

    if (resource == 'logout'){
    	req.session.reset();
    	res.json({
    		confirmation:'success',
    		message: 'Come back soon!'
    	});
    	return;
    }

    var controller = controllers[resource];
    if (controller == null){
    	res.json(createErrorObject(resource+ ' is not a valid resource'));
    	return;
    }

	controller.get(req.query, function(err, results){
		if (err){
			res.json(createErrorObject(err.message));
			return;
		}

		var data = {
			confirmation:'success',
			results: results
		}
		res.json(data);
		return;
	});
	return;
});

   //  if (resource == 'profile'){
   //  	ProfileController.get(req.query, function(err, results){
			// if (err){
			// 	res.json(createErrorObject(err.message));
			// 	return;
			// }
   //  		var data = {
   //  			confirmation:'success',
   //  			results: results
   //  		}
   //  		res.json(data);
   //  		return;
   //  });
   //  	return;
//});

router.get('/:resource/:id', function(req, res, next) {
    var resource = req.params.resource;
    var controller = controllers[resource];
    if (controller == null){
    	res.json(createErrorObject(resource+ ' is not a valid resource'));
    	return;
    }
	controller.getById(req.params.id, function(err, result){
		if (err){
			res.json(createErrorObject(err.message));
			return;
		}
		var data = {
			confirmation: 'success',
			result: result
		}
			res.json(data);
			return;
		});
		return;
	// });
});

//     var resource = req.params.resource;
//     if (resource == 'profile')
// 	ProfileController.getById(req.params.id, function(err, result){
// 		if (err){
// 			res.json(createErrorObject(err.message));
// 			return;
// 		}
// 		var data = {
// 			confirmation: 'success',
// 			result: result
// 		}
// 		res.json(data);
// 		return;
// 	});
// 	return;
// }
// });


router.put('/:resource/:id', function(req, res, next) {
    var resource = req.params.resource;
    var controller = controllers[resource];
    if (controller == null){
    	res.json(createErrorObject(resource+ ' is not a valid resource'));
    	return;
    }
	controller.put(req.params.id, req.body, function(err, result){
		if (err){
			res.json(createErrorObject(err.message));
			return;
		}
		res.json({
			confirmation: 'success',
			result:result
		});
		return;
	});
});
   //  var resource = req.params.resource;
   //  if (resource == 'profile'){
   //  	ProfileController.put(req.params.id, req.body, function(err, result){
			// if (err){
			// 	res.json(createErrorObject(err.message));
			// 	return;
			// }
   //  		var data  = {
   //  			confirmation: 'success',
   //  			result:result
   //  		}
   //  		res.json(data);
   //  		return;
   //  	});
   //  }
//  });

module.exports = router;
