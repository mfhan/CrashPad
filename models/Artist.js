var mongoose = require('mongoose');


var ArtistSchema = new mongoose.Schema({
	firstName: {type:String, trim:true, lowercase:true, default:''},
	lastName: {type:String, trim:true, lowercase:true, default:''},
	userName: {type:String, trim:true, lowercase:true, default:''},
	gender: {type:String, default:''},
	zipcode: {type:String, trim:true, default:''},
	glat: {type:String, trim:true, default:'40.7589609'},
	glong: {type:String, trim:true, default:'-73.9841719'},
	email: {type:String, trim:true, lowercase:true, default:''},
	password: {type:String,trim:true, default:''},
	website: {type:String, trim:true, default:''},
  photo: {type:String, trim:true, default:''},
  videolink: {type:String, trim:true, default:''}
});

ArtistSchema.methods.summary = function() {
	var artistSummary = {
		'firstName':this.firstName,
		'lastName':this.lastName,
		'userName':this.userName,
		'gender':this.gender,
		'zipcode':this.zipcode,
		'glat':this.glat,
		'glong':this.glong,
		'email':this.email,
		'website':this.website,
		'photo':this.photo,
		'videolink':this.videolink,
		'id':this._id
	};

	return artistSummary;
};

module.exports = mongoose.model('ArtistSchema', ArtistSchema);