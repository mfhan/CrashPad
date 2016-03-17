var mongoose = require('mongoose');

var PadSchema = new mongoose.Schema({
  owner: {type:String, trim: true, lowercase:true, default:''},
  address: {type:String, trim: true, lowercase:true, default:''},
  city: {type:String, trim: true, lowercase:true, default:''},
  state: {type:String, trim: true, lowercase:true, default:''},
  zip: {type:String, trim: true, lowercase:true, default:''},
  size: {type:Number, trim: true, lowercase:true, default:100},
  capacity: {type:Number, trim: true, lowercase:true, default:1},
  rate: {type:Number, default: 0},
});

PadSchema.methods.summary = function() {
  var padDetails = {
  'owner':this.owner,
  'address':this.address,
  'city':this.city,
  'state':this.state,
  'zip':this.zip,
  'size':this.size,
  'capacity':this.capacity,
  'rate':this.rate,
  'id':this._id
  };

  return padDetails;
};

module.exports = mongoose.model('PadSchema', PadSchema);