var mongoose = require('mongoose');
	Schema = mongoose.Schema;
var FlowerSchema = new Schema({
  	_business:{type: Schema.Types.ObjectId, ref:'Business'},
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now},
	image: {type: String},
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
