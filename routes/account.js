var express = require('express');
var router = express.Router();
var ProfileController = require('../controllers/ProfileController');
var PadController = require('../controllers/PadController');
var bcrypt = require('bcrypt');

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
    	var email = loginCredentials.email.toLowerCase;

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
	    	//PREVIOUS CODE, without encryption:
	    	// if (loginCredentials.password != user.password){
	    	// 	res.json(createErrorObject('Incorrect password'));
		    // 	return;
	    	// }
	    	var passwordCorrect = bcrypt.compareSync(loginCredentials.password, user.password);
	    	if (passwordCorrect == false){
	    		res.json(createErrorObject('Incorrect password'));
	    		return;
	    	}

			req.session.user = user._id; //we're installing a cookie
	    	res.json({
	    		confirmation: 'success',
	    		profile: user.summary()
	    		});
	    	return;
	    });
	    return;
	}
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

    res.json({
    	confirmation:'fail',
    	message: 'Invalid' +action
    });
});

module.exports = router;