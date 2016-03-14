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

		req.session.user = result.id;
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
});

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

module.exports = router;
