var mongoose = require('mongoose');
	Schema = mongoose.Schema;
var ProductSchema = new Schema({
	_brand: {type: Schema.Types.ObjectId, ref: 'Brand'},
    _business: {type: Schema.Types.ObjectId, ref:'Business'},
    _shop: {type: Schema.Types.ObjectId, ref:'Shop'},
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now},
	image: {type: String},
	name: {type: String},
	description: String,
	type: String,
  	productType: String,
  	each: Number,
  	half_gram: Number,
	one_gram: Number,
	two_gram: Number,
	eigth: Number,
	quarter: Number,
	half: Number,
	ounce: Number,
	age_restriction: Number,
    thc: Number,
    cbd: Number,
    price: Number
});
mongoose.model('Product', ProductSchema);
