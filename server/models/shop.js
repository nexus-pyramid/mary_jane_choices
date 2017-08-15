var mongoose = require('mongoose');
	Schema = mongoose.Schema;
var ShopSchema = new Schema({
	businesses: [{type: Schema.Types.ObjectId, ref: 'Business'}],
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now},
	image: {type: String},
	name: {type: String},
	// : String,
});
mongoose.model('Shop', ShopSchema);
