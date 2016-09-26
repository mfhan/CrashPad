var mongoose = require('mongoose');


var DonorSchema = new mongoose.Schema({
	firstName: {type:String, trim:true, lowercase:true, default:''},
	lastName: {type:String, trim:true, lowercase:true, default:''},
	userName: {type:String, trim:true, lowercase:true, default:''},
  role: {type:String, trim:true, lowercase:true, default:''},
	donationamount: {type:Number, default:0},
	email: {type:String, trim:true, lowercase:true, default:''},
	password: {type:String, default:''}
});

DonorSchema.methods.summary = function() {
	var donorSummary = {
		'firstName':this.firstName,
		'lastName':this.lastName,
		'userName':this.userName,
    'role':this.role,
		'donationamount': this.donationamount,
		'email':this.email,
		'id':this._id
	};

	return donorSummary;
};


// DonorSchema.pre('save', function(next) {
//   var donor = this;
//   if (!donor.isModified('password')) {
//     return next();
//   }
//   bcrypt.genSalt(10, function(err, salt) {
//     if (err) {
//       return next(err);
//     }
//     bcrypt.hash(donor.password, salt, null, function(err, hash) {
//       if (err) {
//         return next(err);
//       }
//       donor.password = hash;
//       next();
//     });
//   });
// });

/**
 * Helper method for validating donor's password.
 */
// DonorSchema.methods.comparePassword = function(candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//     cb(err, isMatch);
//   });
// };

/**
 * Helper method for getting donor's gravatar.
 */
// DonorSchema.methods.gravatar = function(size) {
//   if (!size) {
//     size = 200;
//   }
//   if (!this.email) {
//     return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
//   }
//   var md5 = crypto.createHash('md5').update(this.email).digest('hex');
//   return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
// };

// var Donor = mongoose.model('Donor', DonorSchema);

// module.exports = Donor;

module.exports = mongoose.model('DonorSchema', DonorSchema);