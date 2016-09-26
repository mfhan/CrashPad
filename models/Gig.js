var mongoose = require('mongoose');

var GigSchema = new mongoose.Schema({
	title: {type:String, trim:true, lowercase:true, default:''},
	caption:  {type:String, trim:true, lowercase:true, default:''},
	artistName: {type:String, trim:true, lowercase:true, default:''},
	zipcode: {type:String, trim:true, default:''},
	area: {type:String, trim:true, lowercase:true, default:''},
	timestarted: {type:Date, default: Date.now},
	timefinished: {type:Date, default: null},
	website: String,
  logo: String,
  videolink: String
});

GigSchema.methods.summary = function() {
	var summary = {
		'title':this.perfName,
		'caption': this.caption,
		'artistName':artistName,
		'userName':this.userName,
		'zipcode':this.zipcode,
		'area':this.area,
		'timestarted':this.timestarted,
		'timefinished':this.timefinished,
		'website':this.website,
		'logo':this.logo,
		'videolink':this.videolink,
		'id':this._id
	};

	return summary;
};

module.exports = mongoose.model('GigSchema', GigSchema);