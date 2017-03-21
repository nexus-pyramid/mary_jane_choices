var mongoose = require('mongoose');
	Schema = mongoose.Schema;
var FlowerSchema = new Schema({
  _delivery:{type: Schema.Types.ObjectId, ref:'Delivery'},
	_dispensary: {type: Schema.Types.ObjectId, ref:'Dispensary'},
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now},
	name: {type: String},
	description: String,
	type: String,
	one_gram: Number,
	two_gram: Number,
	eigth: Number,
	quarter: Number,
	half: Number,
	ounce: Number,
  thc: Number
});
mongoose.model('Flower', FlowerSchema);
